// GET /api/history            → the last 20 publishes: [{ sha, message, date }]
// GET /api/history?sha=<sha>  → the site content as it was in that commit
// The editor restores an old version by loading it as a draft and publishing it.
const { CONTENT_PATH, requireOwner, github, config, parseContentFile, fail } = require("./_lib");

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (!requireOwner(req, res)) return;
  const { repo, branch } = config();
  try {
    const sha = req.query.sha;
    if (sha) {
      if (!/^[0-9a-f]{40}$/.test(sha)) {
        res.status(400).json({ error: "Invalid version." });
        return;
      }
      const file = await github(`/repos/${repo}/contents/${CONTENT_PATH}?ref=${sha}`);
      res.status(200).json({ content: parseContentFile(Buffer.from(file.content, "base64").toString("utf8")) });
      return;
    }
    const commits = await github(`/repos/${repo}/commits?sha=${branch}&path=${CONTENT_PATH}&per_page=20`);
    res.status(200).json({
      versions: commits.map((c) => ({
        sha: c.sha,
        message: c.commit.message.split("\n")[0],
        date: c.commit.author.date,
      })),
    });
  } catch (err) {
    fail(res, err);
  }
};
