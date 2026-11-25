import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(__filename), '..', '..');
const packageRoot = process.cwd();
const workspacePackages = new Map([
  ['@mdwrk/extension-host', '../mdwrk-studio/packages/contracts/extension-host'],
  ['@mdwrk/extension-manifest', '../mdwrk-studio/packages/contracts/extension-manifest'],
  ['@mdwrk/theme-contract', '../mdwrk-studio/packages/contracts/theme-contract'],
  ['@mdwrk/i18n', '../mdwrk-studio/packages/shared/i18n'],
  ['@mdwrk/studio-ui-tokens', '../mdwrk-studio/packages/shared/studio-ui-tokens'],
  ['@mdwrk/markdown-editor-core', 'packages/editor/markdown-editor-core'],
  ['@mdwrk/markdown-editor-react', 'packages/editor/markdown-editor-react'],
  ['@mdwrk/markdown-edit-in-renderer-react', 'packages/editor/markdown-edit-in-renderer-react'],
  ['@mdwrk/markdown-renderer-core', 'packages/renderer/markdown-renderer-core'],
  ['@mdwrk/markdown-renderer-react', 'packages/renderer/markdown-renderer-react'],
  ['@mdwrk/extension-runtime', '../mdwrk-studio/packages/extensions/extension-runtime'],
  ['@mdwrk/extension-workspace-files', '../mdwrk-studio/packages/extensions/extension-workspace-files'],
  ['@mdwrk/extension-git-ops', '../mdwrk-studio/packages/extensions/extension-git-ops'],
  ['@mdwrk/extension-manager', '../mdwrk-studio/packages/extensions/extension-manager'],
  ['@mdwrk/extension-gemini-agent', '../mdwrk-studio/packages/extensions/extension-gemini-agent'],
  ['@mdwrk/extension-language-pack-studio', '../mdwrk-studio/packages/extensions/extension-language-pack-studio'],
  ['@mdwrk/extension-catalog-hello', '../mdwrk-studio/packages/extensions/extension-catalog-hello'],
  ['@mdwrk/extension-theme-studio', '../mdwrk-themes/packages/extensions/extension-theme-studio'],
  ['@mdwrk/testing', 'packages/shared/testing'],
  ['@mdwrk/ui-tokens', 'packages/shared/ui-tokens'],
  ['@mdwrk/core-demo-themes', 'packages/shared/core-demo-themes'],
  ['@mdwrk/core-demo-react', 'packages/shared/core-demo-react'],
  ['@mdwrk/icons', 'packages/shared/icons'],
  ['@mdwrk/theme-draft', '../mdwrk-themes/packages/shared/theme-draft'],
  ['@mdwrk/theme-preview', '../mdwrk-themes/packages/shared/theme-preview'],
  ['@mdwrk/theme-diagnostics', '../mdwrk-themes/packages/shared/theme-diagnostics'],
  ['@mdwrk/theme-presets', '../mdwrk-themes/packages/shared/theme-presets'],
  ['@mdwrk/theme-export', '../mdwrk-themes/packages/shared/theme-export'],
  ['@mdwrk/theme-specimens', '../mdwrk-themes/packages/shared/theme-specimens'],
]);
const requestedPackages = process.argv.slice(2);
if (requestedPackages.length === 0) {
  throw new Error('Usage: node ../../../tools/testing/prepare-workspace-links.mjs <package>...');
}
for (const packageName of requestedPackages) {
  const relativeTarget = workspacePackages.get(packageName);
  if (!relativeTarget) {
    throw new Error(`Unknown workspace package: ${packageName}`);
  }
  const target = path.resolve(repoRoot, relativeTarget);
  // A clean checkout uses the installed package when its optional sibling checkout is absent.
  try {
    await fs.access(path.join(target, 'package.json'));
  } catch (error) {
    if (error.code === 'ENOENT') {
      continue;
    }
    throw error;
  }
  const linkPath = path.join(packageRoot, 'node_modules', ...packageName.split('/'));
  await fs.mkdir(path.dirname(linkPath), { recursive: true });
  await fs.rm(linkPath, { recursive: true, force: true });
  try {
    await fs.symlink(target, linkPath, process.platform === 'win32' ? 'junction' : 'dir');
  } catch (error) {
    if (error && (error.code === 'EISDIR' || error.code === 'EPERM')) {
      await fs.cp(target, linkPath, {
        recursive: true,
        force: true,
        filter: (source) => !source.split(path.sep).includes('node_modules'),
      });
      continue;
    }
    throw error;
  }
}
