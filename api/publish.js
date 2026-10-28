// POST /api/publish { content, uploads: [{ path, sha }], message, baseVersion }
// Writes data/content.js plus any uploaded files as ONE commit on the deploy branch.
// Vercel sees the commit and redeploys the site.
//
// baseVersion is content.meta.version as it was when the editor loaded. If the
// published file has moved on since (published from another device), the request is
// refused with 409 so nothing is overwritten without the owner seeing it.
const crypto = require("node:crypto");
const {
  CONTENT_PATH,
  requireOwner,
  checkWrite,
  github,
  config,
  parseContentFile,
  serializeContent,
  isSafeAssetPath,
  fail,
} = require("./_lib");

module.exports = async (req, res) => {
  if (!checkWrite(req, res) || !requireOwner(req, res)) return;

  const { content, uploads = [], message, baseVersion } = req.body || {};
  if (!content || typeof content !== "object" || !content.site || !content.meta) {
    res.status(400).json({ error: "Content is missing or malformed." });
    return;
  }
  if (!Array.isArray(uploads) || uploads.some((u) => !u || !isSafeAssetPath(u.path) || !/^[0-9a-f]{40}$/.test(u.sha))) {
    res.status(400).json({ error: "An uploaded file has an invalid name." });
    return;
  }

  const { repo, branch, author } = config();
  try {
    const ref = await github(`/repos/${repo}/git/ref/heads/${branch}`);
    const headSha = ref.object.sha;
    const head = await github(`/repos/${repo}/git/commits/${headSha}`);

    // conflict check against what is published right now
    const current = await github(`/repos/${repo}/contents/${CONTENT_PATH}?ref=${headSha}`);
    const published = parseContentFile(Buffer.from(current.content, "base64").toString("utf8"));
    const publishedVersion = published.meta && published.meta.version;
    if (baseVersion !== publishedVersion) {
      res.status(409).json({ error: "The site was changed somewhere else since you started editing.", publishedVersion });
      return;
    }

    const version = `${Date.now().toString(36)}-${crypto.randomBytes(3).toString("hex")}`;
    const next = { ...content, meta: { ...content.meta, version, updatedAt: new Date().toISOString() } };
    const contentBlob = await github(`/repos/${repo}/git/blobs`, {
      method: "POST",
      body: { content: serializeContent(next), encoding: "utf-8" },
    });

    const tree = await github(`/repos/${repo}/git/trees`, {
      method: "POST",
      body: {
        base_tree: head.tree.sha,
        tree: [
          { path: CONTENT_PATH, mode: "100644", type: "blob", sha: contentBlob.sha },
          ...uploads.map((u) => ({ path: u.path, mode: "100644", type: "blob", sha: u.sha })),
        ],
      },
    });

    const commit = await github(`/repos/${repo}/git/commits`, {
      method: "POST",
      body: {
        message: String(message || "Update portfolio content").slice(0, 2000),
        tree: tree.sha,
        parents: [headSha],
        author: { ...author, date: new Date().toISOString() },
      },
    });

    try {
      await github(`/repos/${repo}/git/refs/heads/${branch}`, { method: "PATCH", body: { sha: commit.sha, force: false } });
    } catch (err) {
      if (err.status === 422) {
        res.status(409).json({ error: "The site was changed somewhere else while publishing. Please try again." });
        return;
      }
      throw err;
    }

    res.status(200).json({ version, commit: commit.sha });
  } catch (err) {
    fail(res, err);
  }
};
