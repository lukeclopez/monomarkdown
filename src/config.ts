export const CONFIG = {
  headers: {
    h1: "1.8em",
    h2: "1.5em",
    h3: "1.3em",
    h4: "1.2em",
    h5: "1.15em",
    h6: "1.1em",
  },

  themeColors: {
    codeBackground: "textCodeBlock.background",
    quoteBorder: "textBlockQuote.border",
    foreground: "foreground",
    lineNumber: "editorLineNumber.foreground",
  },

  symbols: {
    bullet: "• ",
    checkbox: {
      checked: "☑ ",
      unchecked: "☐ ",
    },
  },

  styles: {
    hide: {
      color: "transparent",
      textDecoration:
        "none; font-size: 0.001em; letter-spacing: -1ch; opacity: 0;",
    },
    inlineCode: {
      borderRadius: "3px",
      textDecoration: "none; font-family: monospace;",
    },
    blockCode: {
      isWholeLine: true,
      textDecoration: "none; font-family: monospace;",
    },
    quote: {
      borderWidth: "0 0 0 4px",
      borderStyle: "solid",
      isWholeLine: true,
      beforeContent: "__",
    },
    bullet: {
      color: "transparent",
      textDecoration: "none; display: none;",
    },
    hr: {
      color: "transparent",
      textDecoration: "none; display: none;",
      isWholeLine: true,
      borderWidth: "0 0 1px 0",
      borderStyle: "solid",
    },
    task: {
      color: "transparent",
      textDecoration: "none; display: none;",
    },
    tablePipe: {
      opacity: "0.3",
    },
    link: {
      fontWeight: "bold",
      textDecoration: "underline",
    },
    header: {
      fontWeight: "bold",
    },
  },
} as const;

export type Config = typeof CONFIG;
