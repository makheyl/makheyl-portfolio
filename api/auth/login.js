// GET /api/auth/login?return=/projects.html  (also reached through /edit)
// Starts "Sign in with GitHub". No repository permissions are requested:
// GitHub is only asked who is signing in.
const crypto = require("node:crypto");
const { OAUTH_COOKIE, cookie, seal, requireEnv, siteOrigin } = require("../_lib");

module.exports = (req, res) => {
  try {
    const state = crypto.randomBytes(16).toString("hex");
    const back = String(req.query.return || "/");
    const returnTo = back.startsWith("/") && !back.startsWith("//") ? back : "/";

    res.setHeader(
      "Set-Cookie",
      cookie(OAUTH_COOKIE, seal({ state, returnTo, exp: Date.now() + 10 * 60 * 1000 }), { maxAge: 600 })
    );
    const params = new URLSearchParams({
      client_id: requireEnv("GITHUB_CLIENT_ID"),
      redirect_uri: `${siteOrigin(req)}/api/auth/callback`,
      state,
      allow_signup: "false",
    });
    res.writeHead(302, { Location: `https://github.com/login/oauth/authorize?${params}` });
    res.end();
  } catch (err) {
    res.status(500).send(`Owner sign-in isn't set up yet: ${err.message}`);
  }
};
