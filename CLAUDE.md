# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A web + desktop application for editing Palworld dedicated server configuration files (`PalWorldSettings.ini`). Runs in the browser via `npm run dev` or as a native desktop app via `npm run tauri:dev`.

A legacy standalone version also exists at `palworld-editor-v2-FINAL.html` (open directly in a browser, no build step needed).

## How to Run

- **Browser**: `npm run dev` — starts Vite dev server at `http://localhost:5173`
- **Desktop (Tauri)**: `npm run tauri:dev` — builds the Rust backend and opens a native window
- **Build**: `npm run build` (web) or `npm run tauri:build` (desktop installer)
- **Tests**: `npm run test`
- **Type check**: `npx tsc --noEmit`

### Tauri Prerequisites

The Tauri desktop build requires system libraries (`libwebkit2gtk-4.1-dev`, `libgtk-3-dev`, `librsvg2-dev`, `libssl-dev`, etc.) and a Rust toolchain. See [Tauri v2 prerequisites](https://v2.tauri.app/start/prerequisites/).

## Technology

- **React 19** with TypeScript, built with **Vite**
- **Tailwind CSS v4** for styling
- **Radix UI** primitives (select, slider, switch, tabs, etc.)
- **Tauri v2** for optional native desktop packaging
- **Vitest** for testing

## Architecture

### Domain Layer (`src/domain/`)

Pure TypeScript — no framework dependencies:

- **`parser/`** — `IniParser` + `IniTokenizer`: parses `OptionSettings=(...)` from Palworld INI files
- **`writer/`** — `IniWriter`: regenerates the INI file, preserving formatting for unmodified settings
- **`config/`** — `PalworldConfig` type + `settingsMetadata` (labels, descriptions, ranges, categories)
- **`fields/`** — `SettingField` and `SettingFieldType` types
- **`sections/`** — `ConfigSection` type
- **`values/`** — `SettingValue` and `FormatHint` types

### Adapters Layer (`src/adapters/`)

Ports & adapters pattern for file I/O:

- **`FileGateway.ts`** — `FileGateway` interface + `UserCancelledError`
- **`BrowserFileGateway.ts`** — browser implementation using `<input type="file">` and Blob download
- **`TauriFileGateway.ts`** — Tauri implementation using `@tauri-apps/plugin-dialog` and `@tauri-apps/plugin-fs`
- **`createFileGateway.ts`** — factory that returns `TauriFileGateway` when `window.__TAURI__` exists, otherwise `BrowserFileGateway`

### Hooks (`src/hooks/`)

- **`useFileHandler`** — file upload/download via `FileGateway` (gateway created once via `useRef`)
- **`useSettings`** — settings state management (config, active tab, updates)

### UI (`src/pages/`, `src/components/`)

- **`EditorPage`** — main page with header, welcome screen, settings tabs, and settings panel
- **`components/ui/`** — shadcn/ui primitives (button, card, input, select, slider, switch)
- **`components/`** — domain controls (BooleanControl, NumberControl, SelectControl, TextControl)

### Tauri Backend (`src-tauri/`)

- **`src/lib.rs`** — registers `tauri-plugin-fs` and `tauri-plugin-dialog`
- **`capabilities/default.json`** — permissions for dialog open/save and fs read/write
- **`tauri.conf.json`** — app config (window size, dev URL, frontend dist path)

## Key Implementation Details

- **INI parsing** uses regex to match `OptionSettings=(...)` then extracts `key=value` pairs. Value types (string, boolean, number, tuple) are auto-detected.
- **INI generation** rebuilds the file from stored raw pairs, only overwriting values that were changed.
- **FileGateway abstraction** decouples file I/O from the UI — the same React components work in both browser and Tauri contexts.
- **No external state management** — all state is local React component state via hooks.
- **No routing** — single-page with tab-based navigation within the component.
- Settings metadata (labels, descriptions, min/max ranges, categories) is defined in `settingsMetadata.ts`.
