# Palworld Server Settings Editor

A visual editor for Palworld dedicated server configuration files (`PalWorldSettings.ini`). Runs in the browser or as a native desktop app via Tauri.

Upload your INI file, tweak settings through a friendly tabbed interface, and save the modified file — no manual editing required.

## Features

- **Visual editing** of all Palworld server settings with sliders, toggles, dropdowns, and text inputs
- **7 setting categories**: Gameplay, Time & Rates, Player Stats, Pal Stats, Base & Building, Multiplayer, Server Config
- **Format-preserving** — only modified values are changed, the rest of the file stays untouched
- **Browser mode** — runs in any modern browser, no installation needed
- **Desktop mode** — native file dialogs and direct file system access via Tauri

## Quick Start

### Browser

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Desktop (Tauri)

Requires [Tauri v2 prerequisites](https://v2.tauri.app/start/prerequisites/) (Rust toolchain + system libraries).

```bash
npm install
npm run tauri:dev
```

### Build

```bash
# Web build
npm run build

# Desktop executable
npm run tauri:build
```

The desktop build outputs a portable binary to `src-tauri/target/release/`.

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | TypeScript check + Vite production build |
| `npm run test` | Run tests with Vitest |
| `npm run lint` | Lint with ESLint |
| `npm run tauri:dev` | Launch Tauri dev window |
| `npm run tauri:build` | Build desktop executable |

## Tech Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS v4
- Radix UI
- Tauri v2
- Vitest
