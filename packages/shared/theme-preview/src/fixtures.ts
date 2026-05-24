import type { ThemePreviewFixture } from "./types.js";

export const DEFAULT_THEME_PREVIEW_FIXTURES = [
  {
    id: "doc-baseline",
    title: "Document Baseline",
    markdown: "# Title\n\nParagraph text with `inline code`.\n\n- one\n- two\n",
  },
  {
    id: "table-callout",
    title: "Table And Callout",
    markdown: "> Important note\n\n| Col A | Col B |\n| --- | --- |\n| 1 | 2 |\n",
  },
] as const satisfies readonly ThemePreviewFixture[];
