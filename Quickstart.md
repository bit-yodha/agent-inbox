# Agent Inbox — Quickstart

A single command reference to set up, run, verify, and test the **Agent Inbox** repository.

> **Current scope:** Gate 1 Expo/TypeScript foundation scaffold is in place (`src/app/index.tsx` is a placeholder route with no connected agents yet), while live provider discovery remains at **Gate 0A** (`spikes/slack-dot/`). See [`Roadmap.md`](Roadmap.md) and [`AGENTS.md`](AGENTS.md) before modifying code.

---

## 1. Prerequisites

- **Node.js `>=20`** and **npm** (required by [`package.json`](package.json))
- **Git** (remote: `https://github.com/bit-yodha/agent-inbox.git`)
- **Android SDK + AVD** (for Android emulator runs; on Windows, Orca resolves `%LOCALAPPDATA%\Android\Sdk` automatically)
- **Orca CLI** (`orca`, optional for workspace/emulator control)
- **Xcode / iOS Simulator** (macOS only, for iOS runs)

---

## 2. Clone & Install Dependencies

```sh
git clone https://github.com/bit-yodha/agent-inbox.git
cd agent-inbox
npm ci
```

*(Use `npm install` instead of `npm ci` only when intentionally updating `package-lock.json`.)*

---

## 3. Run the Expo App

Scripts defined in [`package.json`](package.json):

```sh
npm start          # Start Expo dev server (expo start)
npm run android    # Start Expo and open on Android emulator/device (expo start --android)
npm run ios        # Start Expo and open on iOS Simulator (macOS; expo start --ios)
npm run web        # Start Expo in web browser (expo start --web)
```

> **Note:** On Windows, ensure an Android emulator (e.g. `Medium_Phone_API_37.0`) or `adb`-connected device is booted before running `npm run android` (see Section 5).

---

## 4. Typecheck, Lint & Test

Run all baseline verification checks from [`package.json`](package.json):

```sh
npm run typecheck  # Strict TypeScript check (tsc --noEmit)
npm run lint       # Expo ESLint check (expo lint)
npm test           # Jest + React Native Testing Library suite (jest)
```

PowerShell one-liner:

```powershell
npm run typecheck; if ($LASTEXITCODE -eq 0) { npm run lint }; if ($LASTEXITCODE -eq 0) { npm test }
```

POSIX / Git Bash one-liner:

```sh
npm run typecheck && npm run lint && npm test
```

---

## 5. Android Emulator & Orca Emulator

### Option A: Using Orca Emulator (`orca emulator`)

Orca automatically checks `%LOCALAPPDATA%\Android\Sdk` (Windows), `~/Library/Android/sdk` (macOS), and `~/Android/Sdk` (Linux).

```powershell
# Check Orca runtime readiness and list available devices / AVDs
orca status --json
orca emulator devices --json
orca emulator list --json

# Boot and attach an AVD to this workspace (--focus opens Orca's emulator pane)
orca emulator attach Medium_Phone_API_37.0 --focus --json

# Inspect and interact while attached
orca emulator ax --json
orca emulator tap 0.5 0.5 --json
orca emulator type "hello" --json
orca emulator button back --json
orca emulator logcat --lines 200 --json

# Install/launch an APK (when building native Android artifacts)
orca emulator install <path-to.apk> --reinstall --json
orca emulator launch <package.name> --json

# Detach or power off when done
orca emulator kill --json       # stops Orca helper, leaves emulator booted
orca emulator shutdown --json   # stops Orca helper and powers off emulator
```

### Option B: Direct Android SDK CLI (`adb` / `emulator`) in PowerShell

If `adb` and `emulator` are not on your global `PATH`, add them for the current session:

```powershell
$env:ANDROID_HOME = "$env:LOCALAPPDATA\Android\Sdk"
$env:Path = "$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\emulator;$env:Path"

adb devices -l
emulator -list-avds
emulator -avd Medium_Phone_API_37.0
```

---

## 6. Gate 0A — ChatGPT Dot Slack Spike

[`spikes/slack-dot/dot-slack-poc.mjs`](spikes/slack-dot/dot-slack-poc.mjs) is a standalone Node.js 20+ probe (no external dependencies). Read [`spikes/slack-dot/README.md`](spikes/slack-dot/README.md) before running it.

**Safety rules:**
- Inject `SLACK_USER_TOKEN` from your local environment only; never commit tokens, paste them into chat, or screenshot them.
- `test` mode posts **one real message** into an existing Slack DM—run it only after explicit owner consent.
- If `test` times out or returns `INCONCLUSIVE`, check Slack manually first; never rerun `test` automatically.

### List token owner, workspace, and DM channel/peer IDs (read-only, sends nothing)

- **PowerShell:**
  ```powershell
  $env:SLACK_USER_TOKEN = "<your-dev-slack-user-token>"
  node spikes/slack-dot/dot-slack-poc.mjs list
  Remove-Item Env:SLACK_USER_TOKEN
  ```
- **Git Bash / macOS / Linux:**
  ```sh
  SLACK_USER_TOKEN="<your-dev-slack-user-token>" node spikes/slack-dot/dot-slack-poc.mjs list
  ```

### Send one consented nonce connectivity probe (polls up to 2 minutes)

- **PowerShell:**
  ```powershell
  $env:SLACK_USER_TOKEN = "<your-dev-slack-user-token>"
  node spikes/slack-dot/dot-slack-poc.mjs test <D_CHANNEL> <EXPECTED_AGENT_USER_ID>
  Remove-Item Env:SLACK_USER_TOKEN
  ```
- **Git Bash / macOS / Linux:**
  ```sh
  SLACK_USER_TOKEN="<your-dev-slack-user-token>" node spikes/slack-dot/dot-slack-poc.mjs test <D_CHANNEL> <EXPECTED_AGENT_USER_ID>
  ```

Record redacted evidence (`PASS`, `FAIL`, `BLOCKED`, `MOCK ONLY`, or `NOT RUN`) in `docs/integrations/` from [`docs/integrations/TEMPLATE.md`](docs/integrations/TEMPLATE.md).

---

## 7. Open the UI Visual Reference

[`docs/design/agent-inbox-ui.html`](docs/design/agent-inbox-ui.html) is a standalone v0.2 20-screen prototype (all states and replies are simulated). Static boards are in [`docs/design/images/`](docs/design/images/).

- **PowerShell:**
  ```powershell
  Start-Process .\docs\design\agent-inbox-ui.html
  ```
- **Git Bash / Windows `cmd`:**
  ```sh
  start docs/design/agent-inbox-ui.html
  ```
- **macOS / Linux:**
  ```sh
  open docs/design/agent-inbox-ui.html      # macOS
  xdg-open docs/design/agent-inbox-ui.html  # Linux
  ```

---

## 8. Key Reading Order Before Making Changes

1. [`Product.md`](Product.md) (specification index; §§23–24 take precedence)
2. [`docs/architecture/README.md`](docs/architecture/README.md) & [`docs/security/threat-model-and-privacy.md`](docs/security/threat-model-and-privacy.md)
3. [`docs/screens/README.md`](docs/screens/README.md) (S01–S07 and `hosted-connection-setup.md`)
4. [`Roadmap.md`](Roadmap.md) (gate order and exit criteria)
5. [`AGENTS.md`](AGENTS.md) (canonical coding-agent and contributor rules)
