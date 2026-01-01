export const PATTERNS = {
  codeFence: /^(\s*)(```|~~~)(.*)$/,
  header: /^(#{1,6})\s+(.*)$/,
  blockquote: /^(\s*)>(.*)$/,
  horizontalRule: /^(\s*)(---|\*\*\*|___)(\s*)$/,
  unorderedList: /^(\s*)([-*+])\s/,
  taskList: /^(\s*)- \[([ x])\]/,
  inlineCode: /(`+)([^`]+)\1/g,
  bold: /(\*\*|__)(?=\S)(.+?)(?<=\S)\1/g,
  italic: /(\*|_)(?=\S)(.+?)(?<=\S)\1/g,
  link: /\[([^\]]+)\]\(([^\)]+)\)/g,
  strikethrough: /(~~)(.+?)\1/g,
  table: /^\|.*\|$/,
} as const;

export type PatternKey = keyof typeof PATTERNS;
