import { EDITOR_THEME_SAMPLES } from "./editorSamples.js";
import { MARKDOWN_THEME_SAMPLES } from "./markdownSamples.js";
import { UI_THEME_SPECIMENS } from "./uiSpecimens.js";

export const THEME_PREVIEW_SCENARIOS = [
  {
    id: "reading",
    specimen: UI_THEME_SPECIMENS[1],
    markdown: MARKDOWN_THEME_SAMPLES.baseline,
    editor: EDITOR_THEME_SAMPLES.shortDocument,
  },
  {
    id: "authoring",
    specimen: UI_THEME_SPECIMENS[0],
    markdown: MARKDOWN_THEME_SAMPLES.dense,
    editor: EDITOR_THEME_SAMPLES.codeHeavy,
  },
] as const;
