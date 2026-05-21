#!/usr/bin/env node
// Automated validation pipeline for Localskills.ai submissions.
//
// Runs the checks documented in /moderation-policy on every PR. The same script
// runs locally — if it fails on your machine, it fails in CI.
//
// Usage:
//   node scripts/validate.mjs <path-to-skill>      # validate a single skill
//   node scripts/validate.mjs --all                # validate every skill in the repo
//
// Exit code 0 if all skills pass; 1 if any skill has errors.

import { readFile, readdir, stat, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const VALIDATOR_VERSION = "0.2.0";

// ---------------------------------------------------------------------------
// Schema (kept aligned with /site/src/lib/skill-schema.ts).
// We avoid a runtime dependency on Zod here so this script stays portable;
// the manifest format is small enough to validate by hand.
// ---------------------------------------------------------------------------

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const SEMVER_RE =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/;
const ISO_3166_2_RE = /^[a-z]{2}-[a-z0-9]{1,3}$/i;

const REQUIRED_FILES = ["skill.json", "README.md", "SKILL.md", "LICENSE", "CHANGELOG.md"];

const CATEGORIES = new Set([
  "finance",
  "retail",
  "government",
  "transport",
  "property",
  "health",
  "legal",
  "business",
  "lifestyle",
  "developer",
  "agents",
  "utilities",
  // also accept "consumer" since SPEC.md's sample manifest uses it
  "consumer",
]);

const COUNTRY_CODES_LITERAL = [
  "ad","ae","af","ag","ai","al","am","ao","aq","ar","as","at","au","aw","ax",
  "az","ba","bb","bd","be","bf","bg","bh","bi","bj","bl","bm","bn","bo","bq",
  "br","bs","bt","bv","bw","by","bz","ca","cc","cd","cf","cg","ch","ci","ck",
  "cl","cm","cn","co","cr","cu","cv","cw","cx","cy","cz","de","dj","dk","dm",
  "do","dz","ec","ee","eg","eh","er","es","et","fi","fj","fk","fm","fo","fr",
  "ga","gb","gd","ge","gf","gg","gh","gi","gl","gm","gn","gp","gq","gr","gs",
  "gt","gu","gw","gy","hk","hm","hn","hr","ht","hu","id","ie","il","im","in",
  "io","iq","ir","is","it","je","jm","jo","jp","ke","kg","kh","ki","km","kn",
  "kp","kr","kw","ky","kz","la","lb","lc","li","lk","lr","ls","lt","lu","lv",
  "ly","ma","mc","md","me","mf","mg","mh","mk","ml","mm","mn","mo","mp","mq",
  "mr","ms","mt","mu","mv","mw","mx","my","mz","na","nc","ne","nf","ng","ni",
  "nl","no","np","nr","nu","nz","om","pa","pe","pf","pg","ph","pk","pl","pm",
  "pn","pr","ps","pt","pw","py","qa","re","ro","rs","ru","rw","sa","sb","sc",
  "sd","se","sg","sh","si","sj","sk","sl","sm","sn","so","sr","ss","st","sv",
  "sx","sy","sz","tc","td","tf","tg","th","tj","tk","tl","tm","tn","to","tr",
  "tt","tv","tw","tz","ua","ug","uk","us","uy","uz","va","vc","ve","vg","vi",
  "vn","vu","wf","ws","ye","yt","za","zm","zw","global",
];
const COUNTRY_CODES = new Set(COUNTRY_CODES_LITERAL);

const OSI_LICENSES = new Set([
  "MIT",
  "Apache-2.0",
  "BSD-2-Clause",
  "BSD-3-Clause",
  "ISC",
  "MPL-2.0",
  "GPL-2.0",
  "GPL-2.0-only",
  "GPL-2.0-or-later",
  "GPL-3.0",
  "GPL-3.0-only",
  "GPL-3.0-or-later",
  "AGPL-3.0",
  "AGPL-3.0-only",
  "AGPL-3.0-or-later",
  "LGPL-2.1",
  "LGPL-3.0",
  "Unlicense",
  "CC0-1.0",
]);

// ---------------------------------------------------------------------------
// Issue collection
// ---------------------------------------------------------------------------

class IssueList {
  constructor(skillPath) {
    this.skillPath = skillPath;
    this.errors = [];
    this.warnings = [];
  }
  error(check, message) {
    this.errors.push({ check, message });
  }
  warn(check, message) {
    this.warnings.push({ check, message });
  }
  get failed() {
    return this.errors.length > 0;
  }
}

// ---------------------------------------------------------------------------
// Checks
// ---------------------------------------------------------------------------

async function checkRequiredFiles(skillDir, issues) {
  for (const f of REQUIRED_FILES) {
    try {
      await stat(path.join(skillDir, f));
    } catch {
      issues.error("required-files", `missing required file: ${f}`);
    }
  }
}

function validateManifest(manifest, issues) {
  function need(field, predicate, message) {
    if (!predicate(manifest[field])) issues.error("schema", message);
  }

  need("name", (v) => typeof v === "string" && SLUG_RE.test(v), "name must be a kebab-case slug");
  need(
    "displayName",
    (v) => typeof v === "string" && v.length >= 2 && v.length <= 80,
    "displayName must be 2–80 chars"
  );
  need(
    "version",
    (v) => typeof v === "string" && SEMVER_RE.test(v),
    "version must be semver (e.g. 1.0.0)"
  );
  need(
    "description",
    (v) => typeof v === "string" && v.length >= 10 && v.length <= 140,
    "description must be 10–140 chars"
  );
  need(
    "creator",
    (v) =>
      v &&
      typeof v === "object" &&
      typeof v.username === "string" &&
      SLUG_RE.test(v.username) &&
      typeof v.displayName === "string",
    "creator.username (kebab-case) and creator.displayName are required"
  );
  need(
    "license",
    (v) => typeof v === "string" && v.length >= 2,
    "license is required"
  );
  if (manifest.license && !OSI_LICENSES.has(manifest.license)) {
    issues.warn(
      "license",
      `license "${manifest.license}" is not in the OSI list — moderators may flag it`
    );
  }
  need(
    "regions",
    (v) =>
      Array.isArray(v) &&
      v.length > 0 &&
      v.every(
        (r) =>
          typeof r === "string" &&
          (r === "global" || COUNTRY_CODES.has(r.toLowerCase()) || ISO_3166_2_RE.test(r))
      ),
    "regions must be a non-empty array of ISO 3166-1/3166-2 codes (lowercase) or \"global\""
  );
  need(
    "categories",
    (v) =>
      Array.isArray(v) &&
      v.length >= 1 &&
      v.length <= 3 &&
      v.every((c) => typeof c === "string" && CATEGORIES.has(c.toLowerCase())),
    "categories must be 1–3 from the curated list"
  );
  need(
    "tags",
    (v) =>
      Array.isArray(v) &&
      v.length >= 3 &&
      v.length <= 10 &&
      v.every((t) => typeof t === "string" && t.length > 0),
    "tags must be 3–10 non-empty strings"
  );
  need(
    "compatibility",
    (v) => v && typeof v === "object" && Object.keys(v).length > 0,
    "compatibility must list at least one AI tool"
  );
  need(
    "permissions",
    (v) =>
      v &&
      typeof v === "object" &&
      Array.isArray(v.fileSystem) &&
      Array.isArray(v.network) &&
      (typeof v.shell === "boolean" || Array.isArray(v.shell)),
    "permissions must declare fileSystem, network, and shell"
  );
  need(
    "pricing",
    (v) =>
      v &&
      typeof v === "object" &&
      ["free", "paid", "subscription"].includes(v.model) &&
      typeof v.price === "number" &&
      v.price >= 0,
    "pricing.model must be free|paid|subscription with a non-negative price"
  );
  if (
    manifest.safetyLevel &&
    !["low", "medium", "high", "restricted"].includes(manifest.safetyLevel)
  ) {
    issues.error("schema", "safetyLevel must be low|medium|high|restricted");
  }
  if (
    manifest.executionModel &&
    !["draft-only", "computer-use-recommended", "computer-use-required"].includes(
      manifest.executionModel
    )
  ) {
    issues.error(
      "schema",
      "executionModel must be draft-only|computer-use-recommended|computer-use-required"
    );
  }
}

function checkPermissionsScope(manifest, issues) {
  const perms = manifest.permissions ?? {};
  // Wildcard network hosts are discouraged — they're hard to audit.
  for (const host of perms.network ?? []) {
    if (/^\*|\*$|^https?:|\s/.test(host)) {
      issues.warn(
        "permissions",
        `network host "${host}" looks suspicious (use bare hostnames, not URLs or wildcards)`
      );
    }
  }
  // Unrestricted shell is a red flag.
  if (perms.shell === true) {
    issues.warn(
      "permissions",
      "shell: true grants unrestricted shell access. Prefer an explicit allowlist."
    );
  }
}

// Lightweight prompt-injection heuristics. We look for the specific patterns
// SPEC.md calls out. False positives are OK at this layer — they go to human
// review, not auto-reject.
const PROMPT_INJECTION_PATTERNS = [
  {
    name: "ignore-prior-instructions",
    re: /\b(ignore|disregard|forget)\s+(all\s+)?(previous|prior|earlier|preceding|above)\s+(instructions?|rules?|prompts?)/i,
  },
  {
    name: "exfiltration",
    re: /\b(send|exfiltrate|leak|upload|transmit)\b.*?\b(api\s*key|token|credential|secret|private|password)/i,
  },
  {
    name: "authority-claim",
    re: /\byou\s+are\s+now\s+(the\s+)?(system|root|administrator|admin|developer\s+mode)/i,
  },
  {
    name: "tool-jailbreak",
    re: /\bdo\s+anything\s+now\b|\bDAN\s+mode\b|\bjailbreak/i,
  },
  {
    name: "hidden-instruction",
    re: /<!--[\s\S]*?(ignore|override|secret|hidden)[\s\S]*?-->/i,
  },
];

function scanForPromptInjection(text, sourceLabel, issues) {
  if (!text) return;
  for (const { name, re } of PROMPT_INJECTION_PATTERNS) {
    if (re.test(text)) {
      issues.error(
        "prompt-injection",
        `${sourceLabel}: matched suspicious pattern "${name}"`
      );
    }
  }

  // Hidden zero-width/whitespace payloads.
  if (/[​-‏‪-‮⁠-⁯]/.test(text)) {
    issues.error(
      "prompt-injection",
      `${sourceLabel}: contains zero-width or bidi control characters`
    );
  }
}

const MALICIOUS_CODE_PATTERNS = [
  {
    name: "hardcoded-api-key",
    re: /(?:api[_-]?key|secret|token)\s*[:=]\s*['"][A-Za-z0-9_\-]{16,}['"]/i,
  },
  {
    name: "aws-key",
    re: /AKIA[0-9A-Z]{16}/,
  },
  {
    name: "private-key-block",
    re: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
  },
  {
    name: "url-shortener",
    re: /https?:\/\/(?:bit\.ly|t\.co|tinyurl\.com|goo\.gl|ow\.ly|is\.gd|buff\.ly|rebrand\.ly|cutt\.ly)\//i,
  },
  {
    name: "eval-pattern",
    re: /\beval\s*\(|\bnew Function\s*\(|\bsetTimeout\s*\(\s*['"`]/,
  },
  {
    name: "path-traversal",
    re: /(?:\.\.\/){2,}|\.\.\\\\/,
  },
];

function scanForMaliciousCode(text, sourceLabel, issues) {
  if (!text) return;
  // For markdown files, only scan inside fenced code blocks — that's where
  // executable code lives. Patterns in prose / markdown links are typically
  // false positives (e.g. "../../" in a relative doc link).
  const isMarkdown = sourceLabel.toLowerCase().endsWith(".md");
  let searchSpace = text;
  if (isMarkdown) {
    const blocks = text.match(/```[\s\S]*?```/g) ?? [];
    if (blocks.length === 0) return;
    searchSpace = blocks.join("\n");
  }
  for (const { name, re } of MALICIOUS_CODE_PATTERNS) {
    if (re.test(searchSpace)) {
      issues.error(
        "malicious-code",
        `${sourceLabel}: matched pattern "${name}"`
      );
    }
  }
}

function scanUndeclaredNetwork(text, declared, sourceLabel, issues) {
  if (!text) return;
  // We only care about URLs inside fenced code blocks — those represent
  // actual commands/code the skill might execute. URLs in prose or markdown
  // links are documentation references, not network calls.
  const codeBlocks = text.match(/```[\s\S]*?```/g) ?? [];
  if (codeBlocks.length === 0) return;
  const combined = codeBlocks.join("\n");
  const matches = combined.match(/https?:\/\/([a-z0-9.-]+\.[a-z]{2,})/gi) ?? [];
  const ALLOW = new Set([
    "github.com",
    "www.github.com",
    "raw.githubusercontent.com",
    "schema.org",
    "www.w3.org",
    "www.legislation.govt.nz",
    "spdx.org",
  ]);
  const declaredSet = new Set((declared ?? []).map((d) => d.toLowerCase()));
  const flagged = new Set();
  for (const url of matches) {
    const host = url.replace(/^https?:\/\//i, "").toLowerCase();
    if (ALLOW.has(host)) continue;
    if (declaredSet.has(host)) continue;
    // ignore hosts that are subdomain-matches of declared (e.g. api.x.co)
    if ([...declaredSet].some((d) => host.endsWith("." + d) || host === d))
      continue;
    flagged.add(host);
  }
  for (const host of flagged) {
    issues.warn(
      "undeclared-network",
      `${sourceLabel}: references "${host}" which is not in permissions.network`
    );
  }
}

// ---------------------------------------------------------------------------
// Per-skill validator
// ---------------------------------------------------------------------------

async function validateSkill(skillDir) {
  const issues = new IssueList(skillDir);

  // 1. File-presence check.
  await checkRequiredFiles(skillDir, issues);

  // 2. Manifest parse + schema check.
  let manifest = null;
  try {
    const raw = await readFile(path.join(skillDir, "skill.json"), "utf8");
    manifest = JSON.parse(raw);
  } catch (err) {
    issues.error(
      "schema",
      `could not read/parse skill.json: ${err.message}`
    );
    return issues; // can't continue without a manifest
  }
  validateManifest(manifest, issues);
  checkPermissionsScope(manifest, issues);

  // 3. Slug consistency — the folder name should match manifest.name
  //    (or be a `region/slug` path where the leaf matches).
  const folderLeaf = path.basename(skillDir);
  if (manifest.name && folderLeaf !== manifest.name) {
    issues.warn(
      "naming",
      `folder name "${folderLeaf}" doesn't match manifest.name "${manifest.name}"`
    );
  }

  // 4. Prompt-injection + malicious-code scan on SKILL.md and README.md.
  const sources = [
    ["SKILL.md", await tryRead(path.join(skillDir, "SKILL.md"))],
    ["README.md", await tryRead(path.join(skillDir, "README.md"))],
  ];
  for (const [label, text] of sources) {
    scanForPromptInjection(text, label, issues);
    scanForMaliciousCode(text, label, issues);
    scanUndeclaredNetwork(text, manifest.permissions?.network, label, issues);
  }

  // 5. Compute SHA256 of each tracked file in the skill directory.
  //    Used both for tamper-detection and as a key for cache invalidation.
  issues.hashes = await hashTrackedFiles(skillDir);

  // 6. Snyk Agent Scan hook (deferred). When SNYK_TOKEN is set in env, this
  //    is where we'd shell out to `snyk-agent-scan` and merge its findings.
  //    Not wired yet — see README in skills repo for the install path.

  return issues;
}

const HASHED_FILES = [
  "skill.json",
  "README.md",
  "SKILL.md",
  "LICENSE",
  "CHANGELOG.md",
];

async function hashTrackedFiles(skillDir) {
  const out = {};
  for (const f of HASHED_FILES) {
    try {
      const buf = await readFile(path.join(skillDir, f));
      const hash = createHash("sha256").update(buf).digest("hex");
      out[f] = `sha256:${hash}`;
    } catch {
      // missing file is already flagged by required-files; skip from hashes.
    }
  }
  return out;
}

/**
 * Write an audit.json next to the skill. Captures: when it was checked, by
 * which validator version, what checks ran, results, and file hashes. This
 * is what gets surfaced as the "audited on YYYY-MM-DD" badge on the site
 * and via the `get_audit_status` MCP tool.
 */
async function writeAudit(skillDir, issues, manifest) {
  const audit = {
    schemaVersion: 1,
    skill: {
      name: manifest?.name ?? null,
      version: manifest?.version ?? null,
    },
    auditedAt: new Date().toISOString(),
    validator: {
      name: "localskills-validate",
      version: VALIDATOR_VERSION,
    },
    result: issues.failed
      ? "fail"
      : issues.warnings.length > 0
        ? "pass-with-warnings"
        : "pass",
    checks: [
      "required-files",
      "schema",
      "permissions-scope",
      "prompt-injection",
      "malicious-code",
      "undeclared-network",
    ],
    errors: issues.errors,
    warnings: issues.warnings,
    hashes: issues.hashes ?? {},
  };
  await writeFile(
    path.join(skillDir, "audit.json"),
    JSON.stringify(audit, null, 2) + "\n",
    "utf8"
  );
}

async function tryRead(p) {
  try {
    return await readFile(p, "utf8");
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// Discovery
// ---------------------------------------------------------------------------

async function findAllSkills(root) {
  const skills = [];
  async function walk(dir, depth) {
    if (depth > 3) return; // we don't expect skills nested deeper than region/slug
    let entries;
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const ent of entries) {
      // Skip dotfiles, node_modules/, scripts/, and any folder prefixed with
      // an underscore (convention: _examples/, _drafts/ — not published).
      if (
        ent.name.startsWith(".") ||
        ent.name.startsWith("_") ||
        ent.name === "node_modules" ||
        ent.name === "scripts"
      )
        continue;
      const child = path.join(dir, ent.name);
      if (!ent.isDirectory()) continue;
      try {
        await stat(path.join(child, "skill.json"));
        skills.push(child);
        continue; // don't recurse into a skill dir
      } catch {
        // not a skill dir — keep walking
      }
      await walk(child, depth + 1);
    }
  }
  await walk(root, 0);
  return skills;
}

// ---------------------------------------------------------------------------
// CLI
// ---------------------------------------------------------------------------

function fmtIssues(list) {
  let out = "";
  for (const e of list.errors) {
    out += `  ERROR  [${e.check}] ${e.message}\n`;
  }
  for (const w of list.warnings) {
    out += `  WARN   [${w.check}] ${w.message}\n`;
  }
  return out;
}

async function main() {
  const args = process.argv.slice(2);
  let targets = [];
  if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
    console.log(
      "Usage: node scripts/validate.mjs <skill-dir> [more...]\n" +
        "       node scripts/validate.mjs --all\n\n" +
        "Validates Localskills.ai skill submissions against the schema and\n" +
        "moderation checks documented in /moderation-policy."
    );
    process.exit(args.length === 0 ? 1 : 0);
  }

  if (args.includes("--all")) {
    targets = await findAllSkills(REPO_ROOT);
  } else {
    for (const a of args) {
      // accept "nz/woolworths-refund-helper", "./nz/woolworths-refund-helper", or absolute path
      const candidate = path.isAbsolute(a) ? a : path.resolve(REPO_ROOT, a);
      targets.push(candidate);
    }
  }

  if (targets.length === 0) {
    console.log("No skills found.");
    process.exit(0);
  }

  let failures = 0;
  let warningsCount = 0;
  for (const dir of targets) {
    const rel = path.relative(REPO_ROOT, dir) || dir;
    const issues = await validateSkill(dir);
    warningsCount += issues.warnings.length;
    if (issues.failed) {
      failures++;
      console.log(`\n✗ ${rel}`);
      process.stdout.write(fmtIssues(issues));
    } else if (issues.warnings.length > 0) {
      console.log(`\n△ ${rel} (passed with warnings)`);
      process.stdout.write(fmtIssues(issues));
    } else {
      console.log(`\n✓ ${rel}`);
    }
    // Write audit.json regardless of pass/fail — a failed skill still has
    // a useful audit trail (especially for CI to publish).
    try {
      const manifestRaw = await readFile(path.join(dir, "skill.json"), "utf8");
      const manifest = JSON.parse(manifestRaw);
      await writeAudit(dir, issues, manifest);
    } catch {
      // If we can't read the manifest, write an audit with whatever we have.
      await writeAudit(dir, issues, null);
    }
  }

  console.log(
    `\n${targets.length} skill(s) checked, ${failures} failed, ${warningsCount} warning(s).`
  );
  process.exit(failures > 0 ? 1 : 0);
}

main().catch((err) => {
  console.error("validate.mjs crashed:", err);
  process.exit(2);
});
