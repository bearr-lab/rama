---
name: full-suite-audit
description: Perform a comprehensive full-suite build, regex stub scan, and task completion audit to verify production readiness.
---

# Full Suite Build & Regex Auditing Protocol

**Role:** Lead Quality & Release Engineer  
**Objective:** Execute an exhaustive 5-step verification suite across the codebase to ensure zero remaining stubs, 100% checklist completion, strict type safety, and production build readiness before release.

---

## Step 1: Task Checklist & Tracker Audit
1. Locate the active task tracker for the project (e.g., `task.md`, `TODO.md`, or project implementation plans).
2. Scan all listed epics, phases, and tasks.
3. Verify that 100% of required tasks are marked as completed (`[x]`).
4. If any tasks are marked as uncompleted (`[ ]`) or in-progress (`[/]`), list them explicitly as blocking release items.

---

## Step 2: Deep Regex Stub & Placeholder Scan
1. Use the `grep_search` tool (with `IsRegex: true`, `CaseInsensitive: true`) to scan core application directories (`app/`, `components/`, `lib/`, `supabase/`, `api/`).
2. Search query pattern: `TODO|FIXME|PENDING|STUB|placeholder`.
3. **Analyze and Filter Matches**:
   * **Ignore Valid Domain Usage**: HTML `<input placeholder="...">`, Tailwind CSS classes (e.g., `placeholder:text-muted`), or valid domain constants/enums (e.g., `'TRANSFER_PENDING'`, `'RENEWAL_PENDING'`).
   * **Flag Unresolved Code**: Identify any developer notes, mock return stubs, hardcoded dummy strings, or unfinished logic blocks.
4. If unresolved stubs are found, immediately upgrade them into production-grade implementations before proceeding.

---

## Step 3: Strict TypeScript & Production Build Verification
1. Invoke `run_command` to run the full production build compiler: `pnpm build` (or `pnpm exec tsc --noEmit` followed by `pnpm build`).
2. **Non-Polling Execution**: Launch the command and let reactive wakeup notify you upon completion—do not loop or poll for status.
3. Verify that 100% of application routes compile cleanly with **0 type errors, 0 lint errors, and 0 module resolution failures**.
4. If build errors occur, extract the exact component file and line number from the logs, fix the root cause, and re-run the verification.

---

## Step 4: Database & Architecture Resilience Audit
1. **Database & RLS**: Verify that all required SQL migrations have been applied to the active database and that Row Level Security (RLS) is enabled on public tables.
2. **Resilience Fallthrough**: Check critical external integrations (AI routers, third-party APIs) to ensure they contain proper fallthrough chains or offline simulation fallbacks rather than failing silently or relying on hardcoded dummy API keys.

---

## Step 5: Synthesis & CTO Verification Report
Produce a structured, executive-level markdown report summarizing the audit results in the following format:

| Audit Area | Verification Methodology | Result (PASS/FAIL) | Findings |
| :--- | :--- | :--- | :--- |
| **Task Tracker** | Scan of `task.md` | 🟢 / 🔴 | Detail on completion percentage |
| **Stub & TODO Scan** | Regex search across codebase | 🟢 / 🔴 | Count of unresolved stubs vs valid usage |
| **Production Build** | `pnpm build` execution | 🟢 / 🔴 | Build time and route compilation count |
| **Database & Security** | RLS and table policy audit | 🟢 / 🔴 | Live state confirmation |
| **Resilience Architecture**| API fallthrough verification | 🟢 / 🔴 | High-availability confirmation |

**Rule of Thumb:** Never declare an epic or project "Complete" until all 5 steps of this protocol return a clean 🟢 PASS.
