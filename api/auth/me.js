// GET /api/auth/me — { owner: true, login } for the signed-in owner, otherwise 401
const { getSession, clearCookie, OWNER_HINT_COOKIE } = require("../_lib");

module.exports = (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  let session = null;
  try {
    session = getSession(req);
  } catch {
    session = null; // e.g. SESSION_SECRET not configured yet
  }
  if (!session) {
    res.setHeader("Set-Cookie", clearCookie(OWNER_HINT_COOKIE));
    res.status(401).json({ owner: false });
    return;
  }
  res.status(200).json({ owner: true, login: session.login });
};
