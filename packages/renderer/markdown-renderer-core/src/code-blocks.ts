function escapeCodeBlockLabel(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function rewritePreClasses(preAttributes: string): string {
  return preAttributes.replace(/\bmd-code-block\b/g, "md-code-surface").replace(/\s+/g, " ");
}

function rewriteCodeClasses(codeAttributes: string): string {
  const classMatch = codeAttributes.match(/\bclass="([^"]*)"/);
  if (!classMatch) {
    return `${codeAttributes} class="md-code-content"`;
  }

  const classNames = classMatch[1]
    .split(/\s+/)
    .filter(Boolean);

  if (!classNames.includes("md-code-content")) {
    classNames.unshift("md-code-content");
  }

  return codeAttributes.replace(/\bclass="[^"]*"/, `class="${classNames.join(" ")}"`);
}

export function enhanceRenderedCodeBlocks(html: string): string {
  const opened = html.replace(
    /<pre([^>]*\bclass="[^"]*\bmd-code-block\b[^"]*"[^>]*)><code([^>]*)>/g,
    (_match, preAttributes: string, codeAttributes: string) => {
      const languageMatch = codeAttributes.match(/\bclass="[^"]*\blanguage-([A-Za-z0-9_+-]+)\b[^"]*"/);
      const rawLanguage = languageMatch?.[1];
      const language = rawLanguage || "";
      const label = language ? escapeCodeBlockLabel(language.toUpperCase()) : "";
      const nextPreAttributes = rewritePreClasses(preAttributes);
      const nextCodeAttributes = rewriteCodeClasses(codeAttributes);
      const header = language
        ? [
            '<figcaption class="md-code-header">',
            `<span class="md-code-language">${label}</span>`,
            "</figcaption>",
          ].join("")
        : "";

      return [
        `<figure class="md-code-block"${language ? ` data-code-language="${escapeCodeBlockLabel(language)}"` : ""}>`,
        header,
        `<pre${nextPreAttributes}><code${nextCodeAttributes}>`,
      ].join("");
    },
  );

  return opened.replace(
    /(<figure class="md-code-block"[\s\S]*?<pre[^>]*><code[\s\S]*?<\/code><\/pre>)(?!<\/figure>)/g,
    "$1</figure>",
  );
}
