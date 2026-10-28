// Shared helpers for the owner editor's serverless functions (Vercel, Node runtime).
// Files starting with "_" are not exposed as endpoints.
//
// Environment variables (Vercel → Project → Settings → Environment Variables):
//   GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET  GitHub OAuth app, used only to prove who is signing in
//   GITHUB_TOKEN                            fine-grained token: Contents read/write on this repo only
//   SESSION_SECRET                          long random string that encrypts the session cookie
//   OWNER_LOGIN                             GitHub username allowed to edit (default: makheyl)
//   REPO                                    owner/name of this repository (default: makheyl/makheyl-portfolio)
//   BRANCH                                  branch Vercel deploys from (default: main)
//   COMMIT_NAME, COMMIT_EMAIL               author of publish commits (defaults below)

const crypto = require("node:crypto");

const CONTENT_PATH = "data/content.js";
const SESSION_COOKIE = "mk_session";
const OWNER_HINT_COOKIE = "mk_owner";
const OAUTH_COOKIE = "mk_oauth";
const SESSION_DAYS = 7;

const config = () => ({
  owner: (process.env.OWNER_LOGIN || "makheyl").toLowerCase(),
  repo: process.env.REPO || "makheyl/makheyl-portfolio",
  branch: process.env.BRANCH || "main",
  author: {
    name: process.env.COMMIT_NAME || "Makheyl",
    email: process.env.COMMIT_EMAIL || "205048947+makheyl@users.noreply.github.com",
  },
});

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable ${name}`);
  return value;
}

/* ---------- Encrypted cookies (AES-256-GCM) ---------- */
const key = () => crypto.createHash("sha256").update(requireEnv("SESSION_SECRET")).digest();

function seal(data) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key(), iv);
  const body = Buffer.concat([cipher.update(JSON.stringify(data), "utf8"), cipher.final()]);
  return Buffer.concat([iv, cipher.getAuthTag(), body]).toString("base64url");
}

function unseal(value) {
  try {
    const raw = Buffer.from(String(value), "base64url");
    const decipher = crypto.createDecipheriv("aes-256-gcm", key(), raw.subarray(0, 12));
    decipher.setAuthTag(raw.subarray(12, 28));
    const text = Buffer.concat([decipher.update(raw.subarray(28)), decipher.final()]).toString("utf8");
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function readCookies(req) {
  const out = {};
  String(req.headers.cookie || "")
    .split(";")
    .forEach((part) => {
      const i = part.indexOf("=");
      if (i > 0) out[part.slice(0, i).trim()] = decodeURIComponent(part.slice(i + 1).trim());
    });
  return out;
}

function cookie(name, value, { maxAge, httpOnly = true } = {}) {
  return [
    `${name}=${encodeURIComponent(value)}`,
    "Path=/",
    `Max-Age=${maxAge}`,
    "Secure",
    "SameSite=Lax",
    httpOnly ? "HttpOnly" : "",
  ]
    .filter(Boolean)
    .join("; ");
}

const clearCookie = (name) => cookie(name, "", { maxAge: 0 });

/* ---------- Requests ---------- */
function siteOrigin(req) {
  const proto = req.headers["x-forwarded-proto"] || (String(req.headers.host).startsWith("localhost") ? "http" : "https");
  return `${proto}://${req.headers.host}`;
}

function getSession(req) {
  const session = unseal(readCookies(req)[SESSION_COOKIE]);
  if (!session || !session.login || session.exp < Date.now()) return null;
  if (session.login.toLowerCase() !== config().owner) return null;
  return session;
}

// Returns the session, or answers 401 and returns null
function requireOwner(req, res) {
  const session = getSession(req);
  if (!session) res.status(401).json({ error: "Not signed in as the owner." });
  return session;
}

// Writes must come from this site's own pages (blocks cross-site form posts and scripts)
function checkWrite(req, res, method = "POST") {
  if (req.method !== method) {
    res.status(405).json({ error: `Use ${method}.` });
    return false;
  }
  const origin = req.headers.origin;
  if (origin !== siteOrigin(req) || req.headers["x-requested-with"] !== "portfolio-editor") {
    res.status(403).json({ error: "Request not allowed." });
    return false;
  }
  return true;
}

/* ---------- GitHub API (repository writes use GITHUB_TOKEN) ---------- */
async function github(path, { method = "GET", body, token = requireEnv("GITHUB_TOKEN") } = {}) {
  const res = await fetch(`https://api.github.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "makheyl-portfolio-editor",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) {
    const err = new Error((data && data.message) || `GitHub ${res.status}`);
    err.status = res.status;
    throw err;
  }
  return data;
}

// "window.CONTENT = {...};" → the object
function parseContentFile(text) {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  return JSON.parse(text.slice(start, end + 1));
}

function serializeContent(content) {
  return (
    "/* Site content. Edited from the site itself (owner editor) or by hand.\n" +
    "   Loaded before script.js on every page. Keep it valid JSON inside window.CONTENT. */\n" +
    "window.CONTENT = " +
    JSON.stringify(content, null, 2) +
    ";\n"
  );
}

// Only files under assets/, with plain names, may be written by the editor
const SAFE_ASSET = /^assets\/[a-z0-9][a-z0-9/_.-]*\.(jpe?g|png|webp|gif|pdf|mp4)$/i;
const isSafeAssetPath = (p) => typeof p === "string" && SAFE_ASSET.test(p) && !p.includes("..") && !p.includes("//");

function fail(res, err) {
  const status = err.status === 409 ? 409 : err.status && err.status < 500 ? 502 : 500;
  res.status(status).json({ error: err.message || "Something went wrong." });
}

module.exports = {
  CONTENT_PATH,
  SESSION_COOKIE,
  OWNER_HINT_COOKIE,
  OAUTH_COOKIE,
  SESSION_DAYS,
  config,
  requireEnv,
  seal,
  unseal,
  readCookies,
  cookie,
  clearCookie,
  siteOrigin,
  getSession,
  requireOwner,
  checkWrite,
  github,
  parseContentFile,
  serializeContent,
  isSafeAssetPath,
  fail,
};
