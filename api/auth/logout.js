// POST /api/auth/logout — ends the owner session
const { checkWrite, clearCookie, SESSION_COOKIE, OWNER_HINT_COOKIE } = require("../_lib");

module.exports = (req, res) => {
  if (!checkWrite(req, res)) return;
  res.setHeader("Set-Cookie", [clearCookie(SESSION_COOKIE), clearCookie(OWNER_HINT_COOKIE)]);
  res.status(204).end();
};
