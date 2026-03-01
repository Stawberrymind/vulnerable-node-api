# Vulnerable Node.js REST API

An **intentionally vulnerable** Node.js REST API designed for benchmarking security scanning tools and code quality analyzers.

> ⚠️ **WARNING**: This application contains deliberate security vulnerabilities. Do NOT deploy to production or expose to the public internet.

## Quick Start

```bash
npm install
node app.js
```

The server starts at `http://localhost:3000`.

## Stack

- Express.js 4.17.1
- SQLite via better-sqlite3
- Plain JavaScript (no TypeScript, no ORM)

## Default Users

| Username | Password  | Role  |
|----------|-----------|-------|
| admin    | admin123  | admin |
| alice    | password  | user  |
| bob      | bob2024   | user  |

## API Endpoints

| Method | Endpoint             | Auth Required |
|--------|----------------------|---------------|
| POST   | /api/login           | No            |
| POST   | /api/register        | No            |
| GET    | /api/users           | Yes (JWT)     |
| GET    | /api/users/:id       | Yes (JWT)     |
| PUT    | /api/users/:id       | Yes (JWT)     |
| GET    | /api/products?q=     | No            |
| POST   | /api/products        | Yes (JWT)     |
| POST   | /api/ping            | No            |
| POST   | /api/calculate       | No            |
| GET    | /api/file?file=      | No            |
| GET    | /api/admin/dashboard | No            |
| DELETE | /api/admin/users/:id | No            |

---

## Embedded Vulnerabilities (30 Issues)

### CRITICAL (5)

| #  | Description                                      | File                     | Line(s)   |
|----|--------------------------------------------------|--------------------------|-----------|
| 1  | SQL injection via string concatenation in query   | src/service/index.js     | ~44, ~68, ~79 |
| 2  | Hardcoded API secret in source code               | src/service/index.js     | ~7        |
| 3  | Command injection using `exec()` with user input  | src/controller/index.js  | ~127      |
| 4  | JWT accepts `algorithm:none` (no algorithms arr)  | src/controller/index.js  | ~159      |
| 5  | Passwords stored as plain MD5                     | src/service/index.js     | ~36, ~55  |

### HIGH (7)

| #  | Description                                        | File                     | Line(s)   |
|----|----------------------------------------------------|--------------------------|-----------|
| 6  | No rate limiting on `/login`                       | src/routes/index.js      | ~9        |
| 7  | IDOR — no ownership check on `GET /users/:id`      | src/controller/index.js  | ~70       |
| 8  | Mass assignment via `Object.assign(user, req.body)` | src/controller/index.js | ~84       |
| 9  | Full user object with password hash in API response | src/controller/index.js | ~52, ~76  |
| 10 | `eval()` called on user input                      | src/controller/index.js  | ~136      |
| 11 | Path traversal in `GET /file` via `req.query.file` | src/controller/index.js  | ~147      |
| 12 | No auth middleware on `/admin` routes               | src/routes/index.js      | ~37–38    |

### MEDIUM (8)

| #  | Description                                          | File                     | Line(s)  |
|----|------------------------------------------------------|--------------------------|----------|
| 13 | CORS enabled with no restrictions (all origins)      | app.js                   | ~13      |
| 14 | No `helmet()` — missing security headers             | app.js                   | ~15      |
| 15 | JWT secret falls back to hardcoded string             | src/service/index.js     | ~10      |
| 16 | Stack traces returned to client in error responses   | src/controller/index.js  | ~141, ~153 |
| 17 | `new RegExp(req.query.search)` — ReDoS vulnerability | src/controller/index.js  | ~100     |
| 18 | No input validation on any endpoint                  | src/controller/index.js  | ~30, ~57, ~128 |
| 19 | `console.log` logs full `req.body` incl. passwords   | src/controller/index.js  | ~10      |
| 20 | Insecure cookie settings: `httpOnly:false, secure:false` | src/controller/index.js | ~44   |

### LOW (10)

| #  | Description                                         | File                    | Line(s)  |
|----|-----------------------------------------------------|-------------------------|----------|
| 21 | Express pinned to `4.17.1` (known vulnerable ver.)  | package.json            | ~9       |
| 22 | `.env` file committed — not in `.gitignore`          | .env                    | (entire) |
| 23 | Dead unused function left in controller              | src/controller/index.js | ~14      |
| 24 | TODO comment where auth check was skipped            | src/controller/index.js | ~119     |
| 25 | Silent catch block that swallows errors              | src/controller/index.js | ~62      |
| 26 | Unexplained magic numbers in business logic          | src/service/index.js    | ~86–92   |
| 27 | Mixed async styles (callbacks + async/await in file) | src/controller/index.js | ~148     |
| 28 | No body size limit on `express.json()`               | app.js                  | ~19      |
| 29 | `X-Powered-By` header not removed                   | app.js                  | ~16      |
| 30 | `console.error` used for normal informational logging | src/controller/index.js | ~51, ~120 |
