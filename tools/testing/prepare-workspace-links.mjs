import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(__filename), '..', '..');
const packageRoot = process.cwd();

const workspacePackages = new Map([
  ['@mdwrk/extension-host', 'packages/contracts/extension-host'],
  ['@mdwrk/extension-manifest', 'packages/contracts/extension-manifest'],
  ['@mdwrk/theme-contract', 'packages/contracts/theme-contract'],
  ['@mdwrk/markdown-editor-core', 'packages/editor/markdown-editor-core'],
  ['@mdwrk/markdown-editor-react', 'packages/editor/markdown-editor-react'],
  ['@mdwrk/markdown-renderer-core', 'packages/renderer/markdown-renderer-core'],
  ['@mdwrk/markdown-renderer-react', 'packages/renderer/markdown-renderer-react'],
  ['@mdwrk/extension-runtime', 'packages/extensions/extension-runtime'],
  ['@mdwrk/testing', 'packages/shared/testing'],
  ['@mdwrk/ui-tokens', 'packages/shared/ui-tokens'],
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

  const target = path.join(repoRoot, relativeTarget);
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
