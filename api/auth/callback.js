// GET /api/auth/callback — GitHub sends the visitor back here after sign-in.
// Only the owner's GitHub account gets a session; everyone else sees "Not authorized".
const {
  OAUTH_COOKIE,
  SESSION_COOKIE,
  OWNER_HINT_COOKIE,
  SESSION_DAYS,
  config,
  cookie,
  clearCookie,
  readCookies,
  seal,
  unseal,
  requireEnv,
  siteOrigin,
} = require("../_lib");

const page = (title, text) => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0e0e0e;color:#ededed;
font:16px/1.6 ui-monospace,Menlo,monospace}main{max-width:420px;padding:24px}a{color:inherit}</style></head>
<body><main><h1 style="font-size:20px;font-weight:400">${title}</h1><p>${text}</p><p><a href="/">← Back to the site</a></p></main></body></html>`;

module.exports = async (req, res) => {
  const pending = unseal(readCookies(req)[OAUTH_COOKIE]);
  const { code, state } = req.query;

  if (!pending || pending.exp < Date.now() || !state || state !== pending.state || !code) {
    res.setHeader("Set-Cookie", clearCookie(OAUTH_COOKIE));
    res.status(400).send(page("Sign-in expired", "The sign-in link expired or was already used. Please start again."));
    return;
  }

  try {
    // exchange the one-time code for a token that can only read the public profile
    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: requireEnv("GITHUB_CLIENT_ID"),
        client_secret: requireEnv("GITHUB_CLIENT_SECRET"),
        code,
        redirect_uri: `${siteOrigin(req)}/api/auth/callback`,
      }),
    });
    const { access_token: token } = await tokenRes.json();
    if (!token) throw new Error("GitHub did not confirm the sign-in.");

    const userRes = await fetch("https://api.github.com/user", {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "User-Agent": "makheyl-portfolio-editor" },
    });
    const user = await userRes.json();

    if (!user || !user.login || user.login.toLowerCase() !== config().owner) {
      res.setHeader("Set-Cookie", [clearCookie(OAUTH_COOKIE), clearCookie(SESSION_COOKIE), clearCookie(OWNER_HINT_COOKIE)]);
      res.status(403).send(page("Not authorized", "Only the site owner can edit this site."));
      return;
    }

    // the GitHub token is not kept: the session only records who signed in
    const maxAge = SESSION_DAYS * 24 * 60 * 60;
    res.setHeader("Set-Cookie", [
      clearCookie(OAUTH_COOKIE),
      cookie(SESSION_COOKIE, seal({ login: user.login, id: user.id, exp: Date.now() + maxAge * 1000 }), { maxAge }),
      cookie(OWNER_HINT_COOKIE, "1", { maxAge, httpOnly: false }),
    ]);
    const to = pending.returnTo || "/";
    res.writeHead(302, { Location: to + (to.includes("?") ? "&" : "?") + "edit" });
    res.end();
  } catch (err) {
    res.status(500).send(page("Sign-in failed", `Something went wrong: ${String(err.message).replace(/[<>&]/g, "")}`));
  }
};
