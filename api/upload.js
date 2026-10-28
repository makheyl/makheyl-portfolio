// POST /api/upload { base64 } → { sha }
// Stores one file in the repository's object database (not yet in any commit).
// /api/publish then places it at its path. Files go one per request because
// Vercel limits a request to 4.5 MB.
const { requireOwner, checkWrite, github, config, fail } = require("./_lib");

const MAX_BYTES = 3.2 * 1024 * 1024; // what fits in a 4.5 MB request as base64

module.exports = async (req, res) => {
  if (!checkWrite(req, res) || !requireOwner(req, res)) return;
  const base64 = req.body && req.body.base64;
  if (typeof base64 !== "string" || !base64.length) {
    res.status(400).json({ error: "No file received." });
    return;
  }
  if (Buffer.byteLength(base64, "base64") > MAX_BYTES) {
    res.status(413).json({ error: "File is larger than 3 MB." });
    return;
  }
  try {
    const blob = await github(`/repos/${config().repo}/git/blobs`, {
      method: "POST",
      body: { content: base64, encoding: "base64" },
    });
    res.status(200).json({ sha: blob.sha });
  } catch (err) {
    fail(res, err);
  }
};
