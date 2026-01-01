# Monomarkdown

VS Code extension that hides markdown syntax on inactive lines. Syntax reappears when editing.

## Structure

```
src/
├── extension.ts          # Entry point, event handlers
├── config.ts             # All configuration (sizes, colors, symbols)
├── patterns.ts           # Regex patterns
├── decorations.ts        # Creates VS Code decoration types
├── decorationManager.ts  # Iterates lines, calls parsers, applies decorations
├── types.ts              # TypeScript interfaces
└── parsers/              # Pure functions: LineContext → ranges to decorate
    ├── codeBlocks.ts     # Fences, inline code
    ├── headers.ts        # H1-H6
    ├── formatting.ts     # Bold, italic, strikethrough
    ├── lists.ts          # Bullets, tasks
    ├── blocks.ts         # Quotes, HR, tables
    └── links.ts          # Links
```

## Makefile

- **`build`** — Compile TypeScript (`npm run compile`)
- **`package`** — Create `.vsix` package (`vsce package`)
- **`install`** — Build, package, move to `./builds/`, install to editor
  - Usage: `make install EDITOR=code` (or `cursor`, `windsurf`, `antigravity`)
  - Default: `code`

## Adding Syntax

1. Add pattern to `patterns.ts`
2. Create/update parser in `parsers/`
3. Export from `parsers/index.ts`
4. Call in `decorationManager.ts`
5. Add decoration type to `decorations.ts` if needed
