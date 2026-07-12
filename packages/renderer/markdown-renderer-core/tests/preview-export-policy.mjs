import assert from 'node:assert/strict';
import { renderMarkdownToHtmlDocumentSync } from '../dist/html.js';
import { renderMarkdownToHtmlSync } from '../dist/index.js';

const toDataUri = (mimeType, bytes) => `data:${mimeType};base64,${Buffer.from(bytes).toString('base64')}`;
const rasterFixtures = {
  png: toDataUri('image/png', [0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a,0,0,0,13,0x49,0x48,0x44,0x52,0,0,0,1,0,0,0,1]),
  gif: toDataUri('image/gif', [0x47,0x49,0x46,0x38,0x39,0x61,1,0,1,0]),
  jpeg: toDataUri('image/jpeg', [0xff,0xd8,0xff,0xc0,0,7,8,0,1,0,1,1,0xff,0xd9]),
  webp: toDataUri('image/webp', [0x52,0x49,0x46,0x46,22,0,0,0,0x57,0x45,0x42,0x50,0x56,0x50,0x38,0x58,10,0,0,0,0,0,0,0,0,0,0,0,0,0]),
};

const checks = [
  {
    id: 'sanitize-inline-html-and-unsafe-urls',
    description: 'sanitize mode strips active inline HTML, blocks blocked tags, and rewrites unsafe URLs',
    test() {
      const html = renderMarkdownToHtmlSync('<div onclick="alert(1)"><script>alert(1)</script><a href="javascript:alert(1)">x</a><img src="javascript:alert(1)"/></div>', {
        htmlHandling: 'sanitize',
        profile: 'gfm-default',
      });
      assert.doesNotMatch(html, /<script/i);
      assert.doesNotMatch(html, /alert\(1\)/);
      assert.doesNotMatch(html, /onclick=/i);
      assert.doesNotMatch(html, /javascript:/i);
      assert.match(html, /<a href="#"/);
      assert.match(html, /<img\b[^>]*\/>/);
    },
  },
  {
    id: 'sanitize-markdown-link-and-image-destinations',
    description: 'sanitize mode rewrites unsafe markdown link and image destinations',
    test() {
      const html = renderMarkdownToHtmlSync('[click](javascript:alert(1)) ![alt](data:text/plain,boom)', {
        htmlHandling: 'sanitize',
        profile: 'gfm-default',
      });
      assert.match(html, /<a href="#"/);
      assert.doesNotMatch(html, /javascript:/i);
      assert.doesNotMatch(html, /data:text/i);
    },
  },
  {
    id: 'mdwrk-safe-raster-data-images',
    description: 'MdWrk sanitize mode preserves validated raster data images in inline, reference, and linked forms',
    test() {
      for (const dataUri of Object.values(rasterFixtures)) {
        const markdown = `[![safe](${dataUri})](https://example.com)`;
        const html = renderMarkdownToHtmlSync(markdown, { htmlHandling: 'sanitize', previewerProfile: 'mdwrk-cfm-previewer' });
        assert.match(html, /href="https:\/\/example\.com"/);
        assert.match(html, /src="data:image\/(?:png|jpeg|gif|webp);base64,/);
      }
      const referenceHtml = renderMarkdownToHtmlSync(`![safe][image]\n\n[image]: <${rasterFixtures.png}>`, { htmlHandling: 'sanitize', previewerProfile: 'mdwrk-cfm-previewer' });
      assert.match(referenceHtml, /src="data:image\/png;base64,/);
    },
  },
  {
    id: 'mdwrk-rejects-unsafe-data-images-and-links',
    description: 'MdWrk rejects malformed, mismatched, active-content, oversized-dimension, and hyperlink data URIs',
    test() {
      const oversizedPng = toDataUri('image/png', [0x89,0x50,0x4e,0x47,0x0d,0x0a,0x1a,0x0a,0,0,0,13,0x49,0x48,0x44,0x52,0,0,0x40,1,0,0,0,1]);
      const markdown = [
        '![bad](data:image/png;base64,not-base64)',
        `![mismatch](${toDataUri('image/jpeg', [0x47,0x49,0x46,0x38,0x39,0x61,1,0,1,0])})`,
        '![svg](data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=)',
        '![html](data:text/html;base64,PGgxPmJvb208L2gxPg==)',
        `![large](${oversizedPng})`,
        `[unsafe](${rasterFixtures.png})`,
      ].join(' ');
      const html = renderMarkdownToHtmlSync(markdown, { htmlHandling: 'sanitize', previewerProfile: 'mdwrk-cfm-previewer' });
      assert.doesNotMatch(html, /src="data:/);
      assert.doesNotMatch(html, /image\/svg\+xml|text\/html/);
      assert.match(html, /href="#"/);
    },
  },
  {
    id: 'root-carries-html-handling-attribute',
    description: 'rendered root wrapper records the resolved html handling mode',
    test() {
      const html = renderMarkdownToHtmlSync('Paragraph', {
        htmlHandling: 'sanitize',
        profile: 'gfm-default',
      });
      assert.match(html, /data-markdown-html-handling="sanitize"/);
    },
  },
  {
    id: 'task-checkbox-accessibility-semantics',
    description: 'task checkboxes expose aria semantics in preview markup',
    test() {
      const html = renderMarkdownToHtmlSync('- [x] done\n- [ ] todo', {
        profile: 'gfm-default',
      });
      assert.match(html, /aria-label="Task completed"/);
      assert.match(html, /aria-label="Task not completed"/);
      assert.match(html, /aria-checked="true"/);
      assert.match(html, /aria-checked="false"/);
    },
  },
  {
    id: 'document-export-corpus-coverage',
    description: 'HTML document export preserves raw-html policy plus tables, tasks, footnotes, math, and citations',
    test() {
      const markdown = [
        '| Name | Value |',
        '| --- | ---: |',
        '| Alpha | 1 |',
        '',
        '- [x] done',
        '',
        'Inline $E=mc^2$ and See [@smith2024].',
        '',
        'Statement[^1]',
        '',
        '[^1]: Footnote body',
        '',
        '<div onclick="alert(1)">unsafe</div>',
      ].join('\n');
      const html = renderMarkdownToHtmlDocumentSync(markdown, {
        title: 'Preview Export',
        profile: 'gfm-default',
        extensions: ['footnotes', 'math', 'citations'],
        htmlHandling: 'sanitize',
      });
      assert.match(html, /<!DOCTYPE html>/);
      assert.match(html, /class="mw-html-document"/);
      assert.match(html, /class="mw-html-export mw-pdf-page"/);
      assert.match(html, /class="mw-html-content mw-pdf-content"/);
      assert.match(html, /<table/);
      assert.match(html, /type="checkbox"/);
      assert.match(html, /md-footnotes/);
      assert.match(html, /md-math-inline/);
      assert.match(html, /md-citation/);
      assert.doesNotMatch(html, /onclick=/i);
    },
  },
];

const results = [];
let passed = 0;
for (const check of checks) {
  try {
    check.test();
    results.push({ id: check.id, description: check.description, passed: true });
    passed += 1;
  } catch (error) {
    results.push({ id: check.id, description: check.description, passed: false, message: error.message });
  }
}

const summary = {
  total: results.length,
  passed,
  failed: results.length - passed,
  results,
};

if (process.argv.includes('--json')) {
  process.stdout.write(JSON.stringify(summary, null, 2));
} else {
  assert.equal(summary.failed, 0, `renderer-core preview/export policy failures: ${summary.failed}`);
  console.log('renderer-core preview/export policy tests passed');
}
