# Split Migration Ledger

Source: `E:\swarmauri_github\markdown_workspace`

This ledger classifies monorepo docs, tools, workflows, and selected top-level files during the MdWrk split. Status values are `migrated`, `copied`, `archived`, and `excluded`.

| Source | Status | Destination | Reason |
| --- | --- | --- | --- |
| `.dockerignore` | archived | `` | Repo-local equivalent already exists, should be regenerated, or remains in monorepo archive |
| `.editorconfig` | archived | `` | Repo-local equivalent already exists, should be regenerated, or remains in monorepo archive |
| `.github/workflows/ci.yml` | archived | `mdwrk/.github/workflows/ci.yml` | Core CI workflow already split |
| `.github/workflows/conformance.yml` | archived | `mdwrk/.github/workflows/conformance.yml` | Core conformance workflow already split |
| `.github/workflows/desktop-shell-ci.yml` | archived | `mdwrk-studio/.github/workflows/desktop-shell-ci.yml` | Studio desktop shell CI workflow already split |
| `.github/workflows/desktop-shell-publish.yml` | archived | `mdwrk-studio/.github/workflows/desktop-shell-publish.yml` | Studio desktop publish workflow already split |
| `.github/workflows/desktop-shell-release.yml` | archived | `mdwrk-studio/.github/workflows/desktop-shell-release.yml` | Studio desktop release workflow already split |
| `.github/workflows/docker-compose-restart-client.yml` | archived | `mdwrk-studio/.github/workflows/docker-compose-restart-client.yml` | Studio client deployment workflow already split |
| `.github/workflows/docker-compose-restart-mdwrkcom.yml` | archived | `mdwrk-com/.github/workflows/deploy.yml` | Site repo uses newer deploy/proxy workflows instead |
| `.github/workflows/mdwrkcom-article-metadata.yml` | archived | `mdwrk-com/.github/workflows/article-metadata.yml` | Site article metadata workflow already split |
| `.github/workflows/mdwrkcom-static-content.yml` | archived | `mdwrk-com/.github/workflows/static-content.yml` | Site static content workflow already split |
| `.github/workflows/npm-build-mdwrkcom.yml` | archived | `mdwrk-com/.github/workflows/ci.yml` | Site CI workflow already split |
| `.github/workflows/npm-build-publish-client.yml` | archived | `mdwrk-studio/.github/workflows/npm-build-publish-client.yml` | Studio versioned client publish workflow already split |
| `.github/workflows/npm-test.yml` | archived | `mdwrk/.github/workflows/npm-test.yml` | Core npm test workflow already split |
| `.github/workflows/publish-extensions.yml` | archived | `mdwrk/.github/workflows/publish-extensions.yml` | Core extension publish workflow already split |
| `.github/workflows/publish-packages.yml` | archived | `mdwrk/.github/workflows/publish-packages.yml` | Core package publish workflow already split |
| `.github/workflows/release.yml` | archived | `mdwrk/.github/workflows/release.yml` | Core release workflow already split |
| `.gitignore` | archived | `` | Repo-local equivalent already exists, should be regenerated, or remains in monorepo archive |
| `.npmrc` | archived | `` | Repo-local equivalent already exists, should be regenerated, or remains in monorepo archive |
| `.prettierignore` | archived | `` | Repo-local equivalent already exists, should be regenerated, or remains in monorepo archive |
| `.prettierrc.json` | archived | `` | Repo-local equivalent already exists, should be regenerated, or remains in monorepo archive |
| `.tmp-mdwrkcom-http.err` | excluded | `` | Temporary local artifact |
| `.tmp-mdwrkcom-http.out` | excluded | `` | Temporary local artifact |
| `AGENTS.md` | copied | `mdwrk-com/AGENTS.md` | Shared repository policy file |
| `AGENTS.md` | copied | `mdwrk-pages/AGENTS.md` | Shared repository policy file |
| `AGENTS.md` | copied | `mdwrk-studio/AGENTS.md` | Shared repository policy file |
| `AGENTS.md` | copied | `mdwrk/AGENTS.md` | Shared repository policy file |
| `CODE_OF_CONDUCT.md` | copied | `mdwrk-com/CODE_OF_CONDUCT.md` | Shared repository policy file |
| `CODE_OF_CONDUCT.md` | copied | `mdwrk-pages/CODE_OF_CONDUCT.md` | Shared repository policy file |
| `CODE_OF_CONDUCT.md` | copied | `mdwrk-studio/CODE_OF_CONDUCT.md` | Shared repository policy file |
| `CODE_OF_CONDUCT.md` | copied | `mdwrk/CODE_OF_CONDUCT.md` | Shared repository policy file |
| `CONTRIBUTING.md` | copied | `mdwrk-com/CONTRIBUTING.md` | Shared repository policy file |
| `CONTRIBUTING.md` | copied | `mdwrk-pages/CONTRIBUTING.md` | Shared repository policy file |
| `CONTRIBUTING.md` | copied | `mdwrk-studio/CONTRIBUTING.md` | Shared repository policy file |
| `CONTRIBUTING.md` | copied | `mdwrk/CONTRIBUTING.md` | Shared repository policy file |
| `docker-compose.dev.yml` | archived | `` | Repo-local equivalent already exists, should be regenerated, or remains in monorepo archive |
| `docker-compose.yml` | archived | `` | Repo-local equivalent already exists, should be regenerated, or remains in monorepo archive |
| `docs/adr/ADR-0001-monorepo-and-package-topology.md` | migrated | `mdwrk/docs/adr/ADR-0001-monorepo-and-package-topology.md` | Core/shared markdown workspace documentation |
| `docs/adr/ADR-0002-extension-runtime-and-manifest.md` | migrated | `mdwrk/docs/adr/ADR-0002-extension-runtime-and-manifest.md` | Core/shared markdown workspace documentation |
| `docs/adr/ADR-0003-renderer-editor-package-split.md` | migrated | `mdwrk/docs/adr/ADR-0003-renderer-editor-package-split.md` | Core/shared markdown workspace documentation |
| `docs/adr/ADR-0004-theme-token-and-class-contract.md` | migrated | `mdwrk/docs/adr/ADR-0004-theme-token-and-class-contract.md` | Core/shared markdown workspace documentation |
| `docs/adr/ADR-0005-extension-distribution-model.md` | migrated | `mdwrk/docs/adr/ADR-0005-extension-distribution-model.md` | Core/shared markdown workspace documentation |
| `docs/adr/ADR-0006-release-versioning-and-conformance.md` | migrated | `mdwrk/docs/adr/ADR-0006-release-versioning-and-conformance.md` | Core/shared markdown workspace documentation |
| `docs/adr/ADR-0007-markdown-target-freeze-and-certification-boundary.md` | migrated | `mdwrk/docs/adr/ADR-0007-markdown-target-freeze-and-certification-boundary.md` | Core/shared markdown workspace documentation |
| `docs/adr/ADR-0008-release-train-groups-and-compatibility-baselines.md` | migrated | `mdwrk/docs/adr/ADR-0008-release-train-groups-and-compatibility-baselines.md` | Core/shared markdown workspace documentation |
| `docs/adr/ADR-0009-renderer-commonmark-core-phase2-checkpoint.md` | migrated | `mdwrk/docs/adr/ADR-0009-renderer-commonmark-core-phase2-checkpoint.md` | Core/shared markdown workspace documentation |
| `docs/adr/ADR-0010-gfm-default-profile-phase3-checkpoint.md` | migrated | `mdwrk/docs/adr/ADR-0010-gfm-default-profile-phase3-checkpoint.md` | Core/shared markdown workspace documentation |
| `docs/adr/ADR-0011-optional-profile-boundary-phase4-checkpoint.md` | migrated | `mdwrk/docs/adr/ADR-0011-optional-profile-boundary-phase4-checkpoint.md` | Core/shared markdown workspace documentation |
| `docs/adr/ADR-0012-editor-semantics-and-authoring-ux-phase5-checkpoint.md` | migrated | `mdwrk/docs/adr/ADR-0012-editor-semantics-and-authoring-ux-phase5-checkpoint.md` | Core/shared markdown workspace documentation |
| `docs/adr/ADR-0013-preview-export-and-render-policy-phase6-checkpoint.md` | migrated | `mdwrk/docs/adr/ADR-0013-preview-export-and-render-policy-phase6-checkpoint.md` | Core/shared markdown workspace documentation |
| `docs/adr/ADR-0014-shell-parity-phase7-checkpoint.md` | migrated | `mdwrk/docs/adr/ADR-0014-shell-parity-phase7-checkpoint.md` | Core/shared markdown workspace documentation |
| `docs/adr/ADR-0015-settings-data-git-parity-phase8-checkpoint.md` | migrated | `mdwrk/docs/adr/ADR-0015-settings-data-git-parity-phase8-checkpoint.md` | Core/shared markdown workspace documentation |
| `docs/adr/ADR-0016-theme-inventory-token-contract-and-visual-parity-phase9-checkpoint.md` | migrated | `mdwrk/docs/adr/ADR-0016-theme-inventory-token-contract-and-visual-parity-phase9-checkpoint.md` | Core/shared markdown workspace documentation |
| `docs/adr/ADR-0017-i18n-language-ux-and-catalog-coverage-phase10-checkpoint.md` | migrated | `mdwrk/docs/adr/ADR-0017-i18n-language-ux-and-catalog-coverage-phase10-checkpoint.md` | Core/shared markdown workspace documentation |
| `docs/adr/ADR-0018-package-documentation-examples-boundaries-and-evidence-phase11-checkpoint.md` | migrated | `mdwrk/docs/adr/ADR-0018-package-documentation-examples-boundaries-and-evidence-phase11-checkpoint.md` | Core/shared markdown workspace documentation |
| `docs/adr/ADR-0019-strict-conformance-closure-suite-phase12-checkpoint.md` | migrated | `mdwrk/docs/adr/ADR-0019-strict-conformance-closure-suite-phase12-checkpoint.md` | Core/shared markdown workspace documentation |
| `docs/adr/ADR-0020-rc-freeze-versioning-and-promotion-prep-phase13-checkpoint.md` | migrated | `mdwrk/docs/adr/ADR-0020-rc-freeze-versioning-and-promotion-prep-phase13-checkpoint.md` | Core/shared markdown workspace documentation |
| `docs/adr/ADR-0021-promotion-and-release-phase14-checkpoint.md` | migrated | `mdwrk/docs/adr/ADR-0021-promotion-and-release-phase14-checkpoint.md` | Core/shared markdown workspace documentation |
| `docs/adr/ADR-0022-post-release-stabilization-and-support-window-phase15-checkpoint.md` | migrated | `mdwrk/docs/adr/ADR-0022-post-release-stabilization-and-support-window-phase15-checkpoint.md` | Core/shared markdown workspace documentation |
| `docs/adr/ADR-0023-certification-before-promotion-phase16-checkpoint.md` | migrated | `mdwrk/docs/adr/ADR-0023-certification-before-promotion-phase16-checkpoint.md` | Core/shared markdown workspace documentation |
| `docs/adr/ADR-0024-gate-b-certification-closure-rerun-phase17-checkpoint.md` | migrated | `mdwrk/docs/adr/ADR-0024-gate-b-certification-closure-rerun-phase17-checkpoint.md` | Core/shared markdown workspace documentation |
| `docs/adr/ADR-0025-gate-b-certification-closure-continuation-phase18-checkpoint.md` | migrated | `mdwrk/docs/adr/ADR-0025-gate-b-certification-closure-continuation-phase18-checkpoint.md` | Core/shared markdown workspace documentation |
| `docs/adr/ADR-0026-gate-b-certification-closure-continuation-phase19-checkpoint.md` | migrated | `mdwrk/docs/adr/ADR-0026-gate-b-certification-closure-continuation-phase19-checkpoint.md` | Core/shared markdown workspace documentation |
| `docs/adr/ADR-0027-gate-b-certification-closure-rerun-phase20-checkpoint.md` | migrated | `mdwrk/docs/adr/ADR-0027-gate-b-certification-closure-rerun-phase20-checkpoint.md` | Core/shared markdown workspace documentation |
| `docs/AGENTS.md` | migrated | `mdwrk/docs/AGENTS.md` | Core/shared markdown workspace documentation |
| `docs/apps/desktop-shell-app.md` | migrated | `mdwrk-studio/docs/apps/desktop-shell-app.md` | Studio/client/desktop ownership |
| `docs/apps/mdwrkcom-app.md` | migrated | `mdwrk-com/docs/apps/mdwrkcom-app.md` | Public website ownership |
| `docs/apps/mdwrkspace-app.md` | migrated | `mdwrk-studio/docs/apps/mdwrkspace-app.md` | Studio/client/desktop ownership |
| `docs/architecture/client-extension-ready-host.md` | migrated | `mdwrk/docs/architecture/client-extension-ready-host.md` | Core/shared markdown workspace documentation |
| `docs/architecture/dependency-boundary-map.md` | migrated | `mdwrk/docs/architecture/dependency-boundary-map.md` | Core/shared markdown workspace documentation |
| `docs/architecture/editor-packages.md` | migrated | `mdwrk/docs/architecture/editor-packages.md` | Core/shared markdown workspace documentation |
| `docs/architecture/extension-host-api-usage-rules.md` | migrated | `mdwrk/docs/architecture/extension-host-api-usage-rules.md` | Core/shared markdown workspace documentation |
| `docs/architecture/extension-lifecycle.md` | migrated | `mdwrk/docs/architecture/extension-lifecycle.md` | Core/shared markdown workspace documentation |
| `docs/architecture/extension-manager.md` | migrated | `mdwrk/docs/architecture/extension-manager.md` | Core/shared markdown workspace documentation |
| `docs/architecture/extension-package-layout.md` | migrated | `mdwrk/docs/architecture/extension-package-layout.md` | Core/shared markdown workspace documentation |
| `docs/architecture/extension-runtime.md` | migrated | `mdwrk/docs/architecture/extension-runtime.md` | Core/shared markdown workspace documentation |
| `docs/architecture/gemini-agent-extension.md` | migrated | `mdwrk/docs/architecture/gemini-agent-extension.md` | Core/shared markdown workspace documentation |
| `docs/architecture/i18n-and-theme-interoperability.md` | migrated | `mdwrk/docs/architecture/i18n-and-theme-interoperability.md` | Core/shared markdown workspace documentation |
| `docs/architecture/markdown-style-token-contract.md` | migrated | `mdwrk/docs/architecture/markdown-style-token-contract.md` | Core/shared markdown workspace documentation |
| `docs/architecture/package-inventory.md` | migrated | `mdwrk/docs/architecture/package-inventory.md` | Core/shared markdown workspace documentation |
| `docs/architecture/package-topology.md` | migrated | `mdwrk/docs/architecture/package-topology.md` | Core/shared markdown workspace documentation |
| `docs/architecture/renderer-editor-split.md` | migrated | `mdwrk/docs/architecture/renderer-editor-split.md` | Core/shared markdown workspace documentation |
| `docs/architecture/renderer-packages.md` | migrated | `mdwrk/docs/architecture/renderer-packages.md` | Core/shared markdown workspace documentation |
| `docs/architecture/shared-primitives.md` | migrated | `mdwrk/docs/architecture/shared-primitives.md` | Core/shared markdown workspace documentation |
| `docs/architecture/theme-mapping-guide.md` | migrated | `mdwrk/docs/architecture/theme-mapping-guide.md` | Core/shared markdown workspace documentation |
| `docs/architecture/theme-studio-extension.md` | migrated | `mdwrk/docs/architecture/theme-studio-extension.md` | Core/shared markdown workspace documentation |
| `docs/architecture/theme-token-and-class-contract.md` | migrated | `mdwrk/docs/architecture/theme-token-and-class-contract.md` | Core/shared markdown workspace documentation |
| `docs/architecture/third-party-extension-distribution.md` | migrated | `mdwrk/docs/architecture/third-party-extension-distribution.md` | Core/shared markdown workspace documentation |
| `docs/architecture/token-class-naming-guide.md` | migrated | `mdwrk/docs/architecture/token-class-naming-guide.md` | Core/shared markdown workspace documentation |
| `docs/client-version-delivery.md` | migrated | `mdwrk-studio/docs/client-version-delivery.md` | Studio/client/desktop ownership |
| `docs/conformance/certification-boundary.md` | migrated | `mdwrk/docs/conformance/certification-boundary.md` | Core/shared markdown workspace documentation |
| `docs/conformance/certification-gate-phase16.md` | migrated | `mdwrk/docs/conformance/certification-gate-phase16.md` | Core/shared markdown workspace documentation |
| `docs/conformance/current-certification-status.md` | migrated | `mdwrk/docs/conformance/current-certification-status.md` | Core/shared markdown workspace documentation |
| `docs/conformance/editor-authoring-phase5.md` | migrated | `mdwrk/docs/conformance/editor-authoring-phase5.md` | Core/shared markdown workspace documentation |
| `docs/conformance/evidence-artifacts.md` | migrated | `mdwrk/docs/conformance/evidence-artifacts.md` | Core/shared markdown workspace documentation |
| `docs/conformance/extension-certification-checklist.md` | migrated | `mdwrk/docs/conformance/extension-certification-checklist.md` | Core/shared markdown workspace documentation |
| `docs/conformance/extension-manifest-schema.md` | migrated | `mdwrk/docs/conformance/extension-manifest-schema.md` | Core/shared markdown workspace documentation |
| `docs/conformance/extension-workspace-surfaces-claim.md` | migrated | `mdwrk/docs/conformance/extension-workspace-surfaces-claim.md` | Core/shared markdown workspace documentation |
| `docs/conformance/gate-b-certification-closure-phase17.md` | migrated | `mdwrk-studio/docs/conformance/gate-b-certification-closure-phase17.md` | Studio/browser conformance lane |
| `docs/conformance/gate-b-certification-closure-phase18.md` | migrated | `mdwrk-studio/docs/conformance/gate-b-certification-closure-phase18.md` | Studio/browser conformance lane |
| `docs/conformance/gate-b-certification-closure-phase19.md` | migrated | `mdwrk-studio/docs/conformance/gate-b-certification-closure-phase19.md` | Studio/browser conformance lane |
| `docs/conformance/gate-b-certification-closure-phase20.md` | migrated | `mdwrk-studio/docs/conformance/gate-b-certification-closure-phase20.md` | Studio/browser conformance lane |
| `docs/conformance/gfm-default-profile-phase3.md` | migrated | `mdwrk/docs/conformance/gfm-default-profile-phase3.md` | Core/shared markdown workspace documentation |
| `docs/conformance/i18n-language-phase10.md` | migrated | `mdwrk-studio/docs/conformance/i18n-language-phase10.md` | Studio/browser conformance lane |
| `docs/conformance/markdown-profile-matrix.json` | migrated | `mdwrk/docs/conformance/markdown-profile-matrix.json` | Core/shared markdown workspace documentation |
| `docs/conformance/markdown-profile-snapshot-claim.md` | migrated | `mdwrk/docs/conformance/markdown-profile-snapshot-claim.md` | Core/shared markdown workspace documentation |
| `docs/conformance/markdown-targets.md` | migrated | `mdwrk/docs/conformance/markdown-targets.md` | Core/shared markdown workspace documentation |
| `docs/conformance/optional-profiles-phase4.md` | migrated | `mdwrk/docs/conformance/optional-profiles-phase4.md` | Core/shared markdown workspace documentation |
| `docs/conformance/package-certification-criteria.md` | migrated | `mdwrk/docs/conformance/package-certification-criteria.md` | Core/shared markdown workspace documentation |
| `docs/conformance/package-documentation-phase11.md` | migrated | `mdwrk/docs/conformance/package-documentation-phase11.md` | Core/shared markdown workspace documentation |
| `docs/conformance/phase-21-markdown-lane-deltas.md` | migrated | `mdwrk-studio/docs/conformance/phase-21-markdown-lane-deltas.md` | Studio/browser conformance lane |
| `docs/conformance/post-release-stabilization-phase15.md` | migrated | `mdwrk/docs/conformance/post-release-stabilization-phase15.md` | Core/shared markdown workspace documentation |
| `docs/conformance/preview-export-phase6.md` | migrated | `mdwrk/docs/conformance/preview-export-phase6.md` | Core/shared markdown workspace documentation |
| `docs/conformance/promotion-release-phase14.md` | migrated | `mdwrk/docs/conformance/promotion-release-phase14.md` | Core/shared markdown workspace documentation |
| `docs/conformance/rc-freeze-phase13.md` | migrated | `mdwrk/docs/conformance/rc-freeze-phase13.md` | Core/shared markdown workspace documentation |
| `docs/conformance/renderer-commonmark-core-phase2.md` | migrated | `mdwrk/docs/conformance/renderer-commonmark-core-phase2.md` | Core/shared markdown workspace documentation |
| `docs/conformance/schemas/extension-manifest.schema.json` | migrated | `mdwrk/docs/conformance/schemas/extension-manifest.schema.json` | Core/shared markdown workspace documentation |
| `docs/conformance/settings-data-git-phase8.md` | migrated | `mdwrk-studio/docs/conformance/settings-data-git-phase8.md` | Studio/browser conformance lane |
| `docs/conformance/shell-parity-phase7.md` | migrated | `mdwrk-studio/docs/conformance/shell-parity-phase7.md` | Studio/browser conformance lane |
| `docs/conformance/specifications/commonmark-spec.txt` | migrated | `mdwrk/docs/conformance/specifications/commonmark-spec.txt` | Core/shared markdown workspace documentation |
| `docs/conformance/specifications/gfm-spec.txt` | migrated | `mdwrk/docs/conformance/specifications/gfm-spec.txt` | Core/shared markdown workspace documentation |
| `docs/conformance/strict-conformance-phase12.md` | migrated | `mdwrk/docs/conformance/strict-conformance-phase12.md` | Core/shared markdown workspace documentation |
| `docs/conformance/theme-parity-phase9.md` | migrated | `mdwrk/docs/conformance/theme-parity-phase9.md` | Core/shared markdown workspace documentation |
| `docs/current-state/blog-current-layout-snapshot.md` | migrated | `mdwrk-com/docs/current-state/blog-current-layout-snapshot.md` | Public website ownership |
| `docs/current-state/certifiability-phase-1-honest-scope.md` | migrated | `mdwrk/docs/current-state/certifiability-phase-1-honest-scope.md` | Core/shared markdown workspace documentation |
| `docs/current-state/checkpoints/PHASE_0_CHECKPOINT_SUMMARY.md` | migrated | `mdwrk/docs/current-state/checkpoints/PHASE_0_CHECKPOINT_SUMMARY.md` | Core/shared markdown workspace documentation |
| `docs/current-state/checkpoints/PHASE_1_CHECKPOINT_SUMMARY.md` | migrated | `mdwrk/docs/current-state/checkpoints/PHASE_1_CHECKPOINT_SUMMARY.md` | Core/shared markdown workspace documentation |
| `docs/current-state/checkpoints/PHASE_10_CHECKPOINT_SUMMARY.md` | migrated | `mdwrk-studio/docs/current-state/checkpoints/PHASE_10_CHECKPOINT_SUMMARY.md` | Studio/browser current-state lane |
| `docs/current-state/checkpoints/PHASE_11_CHECKPOINT_SUMMARY.md` | migrated | `mdwrk/docs/current-state/checkpoints/PHASE_11_CHECKPOINT_SUMMARY.md` | Core/shared markdown workspace documentation |
| `docs/current-state/checkpoints/PHASE_12_CHECKPOINT_SUMMARY.md` | migrated | `mdwrk/docs/current-state/checkpoints/PHASE_12_CHECKPOINT_SUMMARY.md` | Core/shared markdown workspace documentation |
| `docs/current-state/checkpoints/PHASE_13_CHECKPOINT_SUMMARY.md` | migrated | `mdwrk/docs/current-state/checkpoints/PHASE_13_CHECKPOINT_SUMMARY.md` | Core/shared markdown workspace documentation |
| `docs/current-state/checkpoints/PHASE_14_CHECKPOINT_SUMMARY.md` | migrated | `mdwrk/docs/current-state/checkpoints/PHASE_14_CHECKPOINT_SUMMARY.md` | Core/shared markdown workspace documentation |
| `docs/current-state/checkpoints/PHASE_15_CHECKPOINT_SUMMARY.md` | migrated | `mdwrk/docs/current-state/checkpoints/PHASE_15_CHECKPOINT_SUMMARY.md` | Core/shared markdown workspace documentation |
| `docs/current-state/checkpoints/PHASE_16_CHECKPOINT_SUMMARY.md` | migrated | `mdwrk/docs/current-state/checkpoints/PHASE_16_CHECKPOINT_SUMMARY.md` | Core/shared markdown workspace documentation |
| `docs/current-state/checkpoints/PHASE_17_CHECKPOINT_SUMMARY.md` | migrated | `mdwrk-studio/docs/current-state/checkpoints/PHASE_17_CHECKPOINT_SUMMARY.md` | Studio/browser current-state lane |
| `docs/current-state/checkpoints/PHASE_18_CHECKPOINT_SUMMARY.md` | migrated | `mdwrk-studio/docs/current-state/checkpoints/PHASE_18_CHECKPOINT_SUMMARY.md` | Studio/browser current-state lane |
| `docs/current-state/checkpoints/PHASE_19_CHECKPOINT_SUMMARY.md` | migrated | `mdwrk-studio/docs/current-state/checkpoints/PHASE_19_CHECKPOINT_SUMMARY.md` | Studio/browser current-state lane |
| `docs/current-state/checkpoints/PHASE_2_CHECKPOINT_SUMMARY.md` | migrated | `mdwrk/docs/current-state/checkpoints/PHASE_2_CHECKPOINT_SUMMARY.md` | Core/shared markdown workspace documentation |
| `docs/current-state/checkpoints/PHASE_20_CHECKPOINT_SUMMARY.md` | migrated | `mdwrk-studio/docs/current-state/checkpoints/PHASE_20_CHECKPOINT_SUMMARY.md` | Studio/browser current-state lane |
| `docs/current-state/checkpoints/PHASE_21_CHECKPOINT_SUMMARY.md` | migrated | `mdwrk-studio/docs/current-state/checkpoints/PHASE_21_CHECKPOINT_SUMMARY.md` | Studio/browser current-state lane |
| `docs/current-state/checkpoints/PHASE_22_CHECKPOINT_SUMMARY.md` | migrated | `mdwrk-studio/docs/current-state/checkpoints/PHASE_22_CHECKPOINT_SUMMARY.md` | Studio/browser current-state lane |
| `docs/current-state/checkpoints/PHASE_3_CHECKPOINT_SUMMARY.md` | migrated | `mdwrk/docs/current-state/checkpoints/PHASE_3_CHECKPOINT_SUMMARY.md` | Core/shared markdown workspace documentation |
| `docs/current-state/checkpoints/PHASE_4_CHECKPOINT_SUMMARY.md` | migrated | `mdwrk/docs/current-state/checkpoints/PHASE_4_CHECKPOINT_SUMMARY.md` | Core/shared markdown workspace documentation |
| `docs/current-state/checkpoints/PHASE_5_CHECKPOINT_SUMMARY.md` | migrated | `mdwrk/docs/current-state/checkpoints/PHASE_5_CHECKPOINT_SUMMARY.md` | Core/shared markdown workspace documentation |
| `docs/current-state/checkpoints/PHASE_6_CHECKPOINT_SUMMARY.md` | migrated | `mdwrk/docs/current-state/checkpoints/PHASE_6_CHECKPOINT_SUMMARY.md` | Core/shared markdown workspace documentation |
| `docs/current-state/checkpoints/PHASE_7_CHECKPOINT_SUMMARY.md` | migrated | `mdwrk-studio/docs/current-state/checkpoints/PHASE_7_CHECKPOINT_SUMMARY.md` | Studio/browser current-state lane |
| `docs/current-state/checkpoints/PHASE_8_CHECKPOINT_SUMMARY.md` | migrated | `mdwrk-studio/docs/current-state/checkpoints/PHASE_8_CHECKPOINT_SUMMARY.md` | Studio/browser current-state lane |
| `docs/current-state/checkpoints/PHASE_9_CHECKPOINT_SUMMARY.md` | migrated | `mdwrk/docs/current-state/checkpoints/PHASE_9_CHECKPOINT_SUMMARY.md` | Core/shared markdown workspace documentation |
| `docs/current-state/checkpoints/PHASE_CERTIFIABILITY_1_CHECKPOINT_SUMMARY.md` | migrated | `mdwrk/docs/current-state/checkpoints/PHASE_CERTIFIABILITY_1_CHECKPOINT_SUMMARY.md` | Core/shared markdown workspace documentation |
| `docs/current-state/mdwrk-migration-status.md` | migrated | `mdwrk/docs/current-state/mdwrk-migration-status.md` | Core/shared markdown workspace documentation |
| `docs/current-state/phase-0-certification-freeze-assessment.md` | migrated | `mdwrk/docs/current-state/phase-0-certification-freeze-assessment.md` | Core/shared markdown workspace documentation |
| `docs/current-state/phase-1-package-graph-audit.md` | migrated | `mdwrk/docs/current-state/phase-1-package-graph-audit.md` | Core/shared markdown workspace documentation |
| `docs/current-state/phase-1-release-train-freeze-assessment.md` | migrated | `mdwrk/docs/current-state/phase-1-release-train-freeze-assessment.md` | Core/shared markdown workspace documentation |
| `docs/current-state/phase-10-i18n-language-assessment.md` | migrated | `mdwrk-studio/docs/current-state/phase-10-i18n-language-assessment.md` | Studio/browser current-state lane |
| `docs/current-state/phase-11-package-documentation-assessment.md` | migrated | `mdwrk/docs/current-state/phase-11-package-documentation-assessment.md` | Core/shared markdown workspace documentation |
| `docs/current-state/phase-12-strict-conformance-assessment.md` | migrated | `mdwrk/docs/current-state/phase-12-strict-conformance-assessment.md` | Core/shared markdown workspace documentation |
| `docs/current-state/phase-13-rc-freeze-assessment.md` | migrated | `mdwrk/docs/current-state/phase-13-rc-freeze-assessment.md` | Core/shared markdown workspace documentation |
| `docs/current-state/phase-14-promotion-assessment.md` | migrated | `mdwrk/docs/current-state/phase-14-promotion-assessment.md` | Core/shared markdown workspace documentation |
| `docs/current-state/phase-15-stabilization-assessment.md` | migrated | `mdwrk/docs/current-state/phase-15-stabilization-assessment.md` | Core/shared markdown workspace documentation |
| `docs/current-state/phase-16-certification-gate-assessment.md` | migrated | `mdwrk/docs/current-state/phase-16-certification-gate-assessment.md` | Core/shared markdown workspace documentation |
| `docs/current-state/phase-17-gate-b-assessment.md` | migrated | `mdwrk-studio/docs/current-state/phase-17-gate-b-assessment.md` | Studio/browser current-state lane |
| `docs/current-state/phase-18-gate-b-assessment.md` | migrated | `mdwrk-studio/docs/current-state/phase-18-gate-b-assessment.md` | Studio/browser current-state lane |
| `docs/current-state/phase-19-gate-b-assessment.md` | migrated | `mdwrk-studio/docs/current-state/phase-19-gate-b-assessment.md` | Studio/browser current-state lane |
| `docs/current-state/phase-2-renderer-commonmark-assessment.md` | migrated | `mdwrk/docs/current-state/phase-2-renderer-commonmark-assessment.md` | Core/shared markdown workspace documentation |
| `docs/current-state/phase-20-gate-b-assessment.md` | migrated | `mdwrk-studio/docs/current-state/phase-20-gate-b-assessment.md` | Studio/browser current-state lane |
| `docs/current-state/phase-21-markdown-and-playwright-assessment.md` | migrated | `mdwrk-studio/docs/current-state/phase-21-markdown-and-playwright-assessment.md` | Studio/browser current-state lane |
| `docs/current-state/phase-22-browser-matrix-assessment.md` | migrated | `mdwrk-studio/docs/current-state/phase-22-browser-matrix-assessment.md` | Studio/browser current-state lane |
| `docs/current-state/phase-3-gfm-default-profile-assessment.md` | migrated | `mdwrk/docs/current-state/phase-3-gfm-default-profile-assessment.md` | Core/shared markdown workspace documentation |
| `docs/current-state/phase-4-optional-profiles-assessment.md` | migrated | `mdwrk/docs/current-state/phase-4-optional-profiles-assessment.md` | Core/shared markdown workspace documentation |
| `docs/current-state/phase-5-editor-authoring-assessment.md` | migrated | `mdwrk/docs/current-state/phase-5-editor-authoring-assessment.md` | Core/shared markdown workspace documentation |
| `docs/current-state/phase-6-preview-export-assessment.md` | migrated | `mdwrk/docs/current-state/phase-6-preview-export-assessment.md` | Core/shared markdown workspace documentation |
| `docs/current-state/phase-7-shell-parity-assessment.md` | migrated | `mdwrk-studio/docs/current-state/phase-7-shell-parity-assessment.md` | Studio/browser current-state lane |
| `docs/current-state/phase-8-settings-data-git-assessment.md` | migrated | `mdwrk-studio/docs/current-state/phase-8-settings-data-git-assessment.md` | Studio/browser current-state lane |
| `docs/current-state/phase-9-theme-parity-assessment.md` | migrated | `mdwrk/docs/current-state/phase-9-theme-parity-assessment.md` | Core/shared markdown workspace documentation |
| `docs/current-state/repository-assessment.md` | migrated | `mdwrk/docs/current-state/repository-assessment.md` | Core/shared markdown workspace documentation |
| `docs/current-state/ssot-registry-maintainer-issue-report.md` | migrated | `mdwrk/docs/current-state/ssot-registry-maintainer-issue-report.md` | Core/shared markdown workspace documentation |
| `docs/current-state/v1-v2-gap-ledger.md` | migrated | `mdwrk/docs/current-state/v1-v2-gap-ledger.md` | Core/shared markdown workspace documentation |
| `docs/examples/editor-basic-example.md` | migrated | `mdwrk/docs/examples/editor-basic-example.md` | Core/shared markdown workspace documentation |
| `docs/examples/renderer-basic-example.md` | migrated | `mdwrk/docs/examples/renderer-basic-example.md` | Core/shared markdown workspace documentation |
| `docs/operations/ci-cd.md` | migrated | `mdwrk/docs/operations/ci-cd.md` | Core/shared markdown workspace documentation |
| `docs/operations/compatibility-baselines.md` | migrated | `mdwrk/docs/operations/compatibility-baselines.md` | Core/shared markdown workspace documentation |
| `docs/operations/compatibility-rules.md` | migrated | `mdwrk/docs/operations/compatibility-rules.md` | Core/shared markdown workspace documentation |
| `docs/operations/publishing-rules.md` | migrated | `mdwrk/docs/operations/publishing-rules.md` | Core/shared markdown workspace documentation |
| `docs/operations/release-automation.md` | migrated | `mdwrk/docs/operations/release-automation.md` | Core/shared markdown workspace documentation |
| `docs/operations/release-evidence-phase11.md` | migrated | `mdwrk/docs/operations/release-evidence-phase11.md` | Core/shared markdown workspace documentation |
| `docs/operations/release-groups.md` | migrated | `mdwrk/docs/operations/release-groups.md` | Core/shared markdown workspace documentation |
| `docs/operations/third-party-extension-authoring.md` | migrated | `mdwrk/docs/operations/third-party-extension-authoring.md` | Core/shared markdown workspace documentation |
| `docs/operations/version-train.md` | migrated | `mdwrk/docs/operations/version-train.md` | Core/shared markdown workspace documentation |
| `docs/operations/versioning-and-support-policy.md` | migrated | `mdwrk/docs/operations/versioning-and-support-policy.md` | Core/shared markdown workspace documentation |
| `docs/README.md` | migrated | `mdwrk/docs/README.md` | Core/shared markdown workspace documentation |
| `docs/reference/apps/mdwrk-mdwrkspace.md` | migrated | `mdwrk-studio/docs/reference/apps/mdwrk-mdwrkspace.md` | Studio/client/desktop ownership |
| `docs/reference/apps/mdwrkcom.md` | migrated | `mdwrk-com/docs/reference/apps/mdwrkcom.md` | Public website ownership |
| `docs/reference/examples/mdwrk-example-editor-basic.md` | migrated | `mdwrk/docs/reference/examples/mdwrk-example-editor-basic.md` | Core/shared markdown workspace documentation |
| `docs/reference/examples/mdwrk-example-renderer-basic.md` | migrated | `mdwrk/docs/reference/examples/mdwrk-example-renderer-basic.md` | Core/shared markdown workspace documentation |
| `docs/reference/package-boundary-map.md` | migrated | `mdwrk/docs/reference/package-boundary-map.md` | Core/shared markdown workspace documentation |
| `docs/reference/packages/mdwrk-extension-catalog-hello.md` | migrated | `mdwrk/docs/reference/packages/mdwrk-extension-catalog-hello.md` | Core/shared markdown workspace documentation |
| `docs/reference/packages/mdwrk-extension-gemini-agent.md` | migrated | `mdwrk/docs/reference/packages/mdwrk-extension-gemini-agent.md` | Core/shared markdown workspace documentation |
| `docs/reference/packages/mdwrk-extension-host.md` | migrated | `mdwrk/docs/reference/packages/mdwrk-extension-host.md` | Core/shared markdown workspace documentation |
| `docs/reference/packages/mdwrk-extension-manager.md` | migrated | `mdwrk/docs/reference/packages/mdwrk-extension-manager.md` | Core/shared markdown workspace documentation |
| `docs/reference/packages/mdwrk-extension-manifest.md` | migrated | `mdwrk/docs/reference/packages/mdwrk-extension-manifest.md` | Core/shared markdown workspace documentation |
| `docs/reference/packages/mdwrk-extension-runtime.md` | migrated | `mdwrk/docs/reference/packages/mdwrk-extension-runtime.md` | Core/shared markdown workspace documentation |
| `docs/reference/packages/mdwrk-extension-theme-studio.md` | migrated | `mdwrk/docs/reference/packages/mdwrk-extension-theme-studio.md` | Core/shared markdown workspace documentation |
| `docs/reference/packages/mdwrk-i18n.md` | migrated | `mdwrk/docs/reference/packages/mdwrk-i18n.md` | Core/shared markdown workspace documentation |
| `docs/reference/packages/mdwrk-icons.md` | migrated | `mdwrk/docs/reference/packages/mdwrk-icons.md` | Core/shared markdown workspace documentation |
| `docs/reference/packages/mdwrk-markdown-editor-core.md` | migrated | `mdwrk/docs/reference/packages/mdwrk-markdown-editor-core.md` | Core/shared markdown workspace documentation |
| `docs/reference/packages/mdwrk-markdown-editor-react.md` | migrated | `mdwrk/docs/reference/packages/mdwrk-markdown-editor-react.md` | Core/shared markdown workspace documentation |
| `docs/reference/packages/mdwrk-markdown-renderer-core.md` | migrated | `mdwrk/docs/reference/packages/mdwrk-markdown-renderer-core.md` | Core/shared markdown workspace documentation |
| `docs/reference/packages/mdwrk-markdown-renderer-react.md` | migrated | `mdwrk/docs/reference/packages/mdwrk-markdown-renderer-react.md` | Core/shared markdown workspace documentation |
| `docs/reference/packages/mdwrk-testing.md` | migrated | `mdwrk/docs/reference/packages/mdwrk-testing.md` | Core/shared markdown workspace documentation |
| `docs/reference/packages/mdwrk-theme-contract.md` | migrated | `mdwrk/docs/reference/packages/mdwrk-theme-contract.md` | Core/shared markdown workspace documentation |
| `docs/reference/packages/mdwrk-ui-tokens.md` | migrated | `mdwrk/docs/reference/packages/mdwrk-ui-tokens.md` | Core/shared markdown workspace documentation |
| `docs/reference/workspace-package-certification-matrix.md` | migrated | `mdwrk/docs/reference/workspace-package-certification-matrix.md` | Core/shared markdown workspace documentation |
| `docs/reference/workspace-reference-index.md` | migrated | `mdwrk/docs/reference/workspace-reference-index.md` | Core/shared markdown workspace documentation |
| `eslint.config.mjs` | copied | `mdwrk-pages/eslint.config.mjs` | Pages package lint configuration |
| `eslint.config.mjs` | copied | `mdwrk-studio/eslint.config.mjs` | Studio package/app lint configuration |
| `eslint.config.mjs` | migrated | `mdwrk/eslint.config.mjs` | Core package lint configuration |
| `LICENSE` | archived | `` | Repo-local equivalent already exists, should be regenerated, or remains in monorepo archive |
| `mdwrk-package-dag-article-correct.png` | migrated | `mdwrk/docs/assets/package-dag/mdwrk-package-dag-article-correct.png` | Package DAG documentation asset |
| `mdwrk-package-dag-article.png` | migrated | `mdwrk/docs/assets/package-dag/mdwrk-package-dag-article.png` | Package DAG documentation asset |
| `package-lock.json` | archived | `` | Repo-local equivalent already exists, should be regenerated, or remains in monorepo archive |
| `package.json` | archived | `` | Repo-local equivalent already exists, should be regenerated, or remains in monorepo archive |
| `page-template-demo-graph-focused.png` | migrated | `mdwrk-pages/docs/assets/page-template-demo/page-template-demo-graph-focused.png` | Pages demo documentation asset |
| `page-template-demo-home.png` | migrated | `mdwrk-pages/docs/assets/page-template-demo/page-template-demo-home.png` | Pages demo documentation asset |
| `page-template-demo-markdown-feature-lander-preset-api.png` | migrated | `mdwrk-pages/docs/assets/page-template-demo/page-template-demo-markdown-feature-lander-preset-api.png` | Pages demo documentation asset |
| `page-template-demo-markdown-feature-preset-backed.png` | migrated | `mdwrk-pages/docs/assets/page-template-demo/page-template-demo-markdown-feature-preset-backed.png` | Pages demo documentation asset |
| `page-template-demo-markdown-feature-template.png` | migrated | `mdwrk-pages/docs/assets/page-template-demo/page-template-demo-markdown-feature-template.png` | Pages demo documentation asset |
| `page-template-demo-markdown-pricing-template.png` | migrated | `mdwrk-pages/docs/assets/page-template-demo/page-template-demo-markdown-pricing-template.png` | Pages demo documentation asset |
| `page-template-demo-markdown-privacy-template.png` | migrated | `mdwrk-pages/docs/assets/page-template-demo/page-template-demo-markdown-privacy-template.png` | Pages demo documentation asset |
| `page-template-demo-md-files.png` | migrated | `mdwrk-pages/docs/assets/page-template-demo/page-template-demo-md-files.png` | Pages demo documentation asset |
| `page-template-demo-terms-subpage.png` | migrated | `mdwrk-pages/docs/assets/page-template-demo/page-template-demo-terms-subpage.png` | Pages demo documentation asset |
| `page-template-demo-updated-markdown.png` | migrated | `mdwrk-pages/docs/assets/page-template-demo/page-template-demo-updated-markdown.png` | Pages demo documentation asset |
| `page-template-demo-updated-preset.png` | migrated | `mdwrk-pages/docs/assets/page-template-demo/page-template-demo-updated-preset.png` | Pages demo documentation asset |
| `playwright.config.ts` | migrated | `mdwrk-studio/playwright.config.ts` | Studio/browser Playwright configuration |
| `playwright.file-inline.config.ts` | migrated | `mdwrk-studio/playwright.file-inline.config.ts` | Studio/browser Playwright configuration |
| `playwright.file.config.ts` | migrated | `mdwrk-studio/playwright.file.config.ts` | Studio/browser Playwright configuration |
| `playwright.inline.config.ts` | migrated | `mdwrk-studio/playwright.inline.config.ts` | Studio/browser Playwright configuration |
| `playwright.phase17.config.ts` | migrated | `mdwrk-studio/playwright.phase17.config.ts` | Studio/browser Playwright configuration |
| `pnpm-lock.yaml` | archived | `` | Lockfile must be regenerated per split repo |
| `pnpm-workspace.yaml` | archived | `` | Repo-local equivalent already exists, should be regenerated, or remains in monorepo archive |
| `pyproject.toml` | archived | `` | Repo-local equivalent already exists, should be regenerated, or remains in monorepo archive |
| `README.md` | archived | `` | Repo-local equivalent already exists, should be regenerated, or remains in monorepo archive |
| `STYLE_GUIDE.md` | copied | `mdwrk-com/STYLE_GUIDE.md` | Shared repository policy file |
| `STYLE_GUIDE.md` | copied | `mdwrk-pages/STYLE_GUIDE.md` | Shared repository policy file |
| `STYLE_GUIDE.md` | copied | `mdwrk-studio/STYLE_GUIDE.md` | Shared repository policy file |
| `STYLE_GUIDE.md` | copied | `mdwrk/STYLE_GUIDE.md` | Shared repository policy file |
| `tools/ci/build-desktop-shell.mjs` | migrated | `mdwrk-studio/tools/ci/build-desktop-shell.mjs` | Studio/browser/desktop CI helper |
| `tools/ci/install-dependencies.mjs` | migrated | `mdwrk-studio/tools/ci/install-dependencies.mjs` | Studio/browser/desktop CI helper |
| `tools/ci/install-playwright-browsers.mjs` | migrated | `mdwrk-studio/tools/ci/install-playwright-browsers.mjs` | Studio/browser/desktop CI helper |
| `tools/ci/playwright-browser-utils.mjs` | migrated | `mdwrk-studio/tools/ci/playwright-browser-utils.mjs` | Studio/browser/desktop CI helper |
| `tools/ci/playwright-chromium-smoke.mjs` | migrated | `mdwrk-studio/tools/ci/playwright-chromium-smoke.mjs` | Studio/browser/desktop CI helper |
| `tools/ci/publish-desktop-shell.mjs` | migrated | `mdwrk-studio/tools/ci/publish-desktop-shell.mjs` | Studio/browser/desktop CI helper |
| `tools/ci/release-desktop-shell.mjs` | migrated | `mdwrk-studio/tools/ci/release-desktop-shell.mjs` | Studio/browser/desktop CI helper |
| `tools/ci/run-e2e-smoke.mjs` | migrated | `mdwrk-studio/tools/ci/run-e2e-smoke.mjs` | Studio/browser/desktop CI helper |
| `tools/ci/run-integration-smoke.mjs` | migrated | `mdwrk-studio/tools/ci/run-integration-smoke.mjs` | Studio/browser/desktop CI helper |
| `tools/ci/run-playwright-browser-matrix.mjs` | migrated | `mdwrk-studio/tools/ci/run-playwright-browser-matrix.mjs` | Studio/browser/desktop CI helper |
| `tools/ci/run-visual-smoke.mjs` | migrated | `mdwrk-studio/tools/ci/run-visual-smoke.mjs` | Studio/browser/desktop CI helper |
| `tools/ci/system-chromium-policy-guard.mjs` | migrated | `mdwrk-studio/tools/ci/system-chromium-policy-guard.mjs` | Studio/browser/desktop CI helper |
| `tools/ci/write-github-matrices.mjs` | migrated | `mdwrk-studio/tools/ci/write-github-matrices.mjs` | Studio/browser/desktop CI helper |
| `tools/conformance/__pycache__/render-official-markdown.cpython-313.pyc` | excluded | `` | Generated Python cache |
| `tools/conformance/check-package-boundaries.mjs` | migrated | `mdwrk/tools/conformance/check-package-boundaries.mjs` | Core/shared tooling |
| `tools/conformance/generate-conformance-artifacts.mjs` | migrated | `mdwrk/tools/conformance/generate-conformance-artifacts.mjs` | Core/shared tooling |
| `tools/conformance/generate-markdown-profile-snapshot-claim.mjs` | migrated | `mdwrk/tools/conformance/generate-markdown-profile-snapshot-claim.mjs` | Core/shared tooling |
| `tools/conformance/generate-phase10-i18n-checkpoint.mjs` | migrated | `mdwrk/tools/conformance/generate-phase10-i18n-checkpoint.mjs` | Core/shared tooling |
| `tools/conformance/generate-phase11-package-evidence.mjs` | migrated | `mdwrk/tools/conformance/generate-phase11-package-evidence.mjs` | Core/shared tooling |
| `tools/conformance/generate-phase12-closure-suite.mjs` | migrated | `mdwrk/tools/conformance/generate-phase12-closure-suite.mjs` | Core/shared tooling |
| `tools/conformance/generate-phase13-rc-train-checkpoint.mjs` | migrated | `mdwrk/tools/conformance/generate-phase13-rc-train-checkpoint.mjs` | Core/shared tooling |
| `tools/conformance/generate-phase14-promotion-checkpoint.mjs` | migrated | `mdwrk/tools/conformance/generate-phase14-promotion-checkpoint.mjs` | Core/shared tooling |
| `tools/conformance/generate-phase15-stabilization-checkpoint.mjs` | migrated | `mdwrk/tools/conformance/generate-phase15-stabilization-checkpoint.mjs` | Core/shared tooling |
| `tools/conformance/generate-phase16-certification-gate-checkpoint.mjs` | migrated | `mdwrk/tools/conformance/generate-phase16-certification-gate-checkpoint.mjs` | Core/shared tooling |
| `tools/conformance/generate-phase17-gate-b-checkpoint.mjs` | migrated | `mdwrk/tools/conformance/generate-phase17-gate-b-checkpoint.mjs` | Core/shared tooling |
| `tools/conformance/generate-phase18-gate-b-checkpoint.mjs` | migrated | `mdwrk/tools/conformance/generate-phase18-gate-b-checkpoint.mjs` | Core/shared tooling |
| `tools/conformance/generate-phase19-gate-b-checkpoint.mjs` | migrated | `mdwrk/tools/conformance/generate-phase19-gate-b-checkpoint.mjs` | Core/shared tooling |
| `tools/conformance/generate-phase2-renderer-checkpoint.mjs` | migrated | `mdwrk/tools/conformance/generate-phase2-renderer-checkpoint.mjs` | Core/shared tooling |
| `tools/conformance/generate-phase20-gate-b-checkpoint.mjs` | migrated | `mdwrk/tools/conformance/generate-phase20-gate-b-checkpoint.mjs` | Core/shared tooling |
| `tools/conformance/generate-phase3-gfm-checkpoint.mjs` | migrated | `mdwrk/tools/conformance/generate-phase3-gfm-checkpoint.mjs` | Core/shared tooling |
| `tools/conformance/generate-phase4-optional-profiles-checkpoint.mjs` | migrated | `mdwrk/tools/conformance/generate-phase4-optional-profiles-checkpoint.mjs` | Core/shared tooling |
| `tools/conformance/generate-phase5-editor-authoring-checkpoint.mjs` | migrated | `mdwrk/tools/conformance/generate-phase5-editor-authoring-checkpoint.mjs` | Core/shared tooling |
| `tools/conformance/generate-phase6-preview-export-checkpoint.mjs` | migrated | `mdwrk/tools/conformance/generate-phase6-preview-export-checkpoint.mjs` | Core/shared tooling |
| `tools/conformance/generate-phase7-shell-checkpoint.mjs` | migrated | `mdwrk/tools/conformance/generate-phase7-shell-checkpoint.mjs` | Core/shared tooling |
| `tools/conformance/generate-phase8-settings-data-git-checkpoint.mjs` | migrated | `mdwrk/tools/conformance/generate-phase8-settings-data-git-checkpoint.mjs` | Core/shared tooling |
| `tools/conformance/generate-phase9-theme-checkpoint.mjs` | migrated | `mdwrk/tools/conformance/generate-phase9-theme-checkpoint.mjs` | Core/shared tooling |
| `tools/conformance/phase-21-markdown-lane-deltas.mjs` | migrated | `mdwrk/tools/conformance/phase-21-markdown-lane-deltas.mjs` | Core/shared tooling |
| `tools/conformance/render-official-markdown.py` | migrated | `mdwrk/tools/conformance/render-official-markdown.py` | Core/shared tooling |
| `tools/conformance/validate-compatibility.mjs` | migrated | `mdwrk/tools/conformance/validate-compatibility.mjs` | Core/shared tooling |
| `tools/conformance/validate-component-classname-styling.mjs` | migrated | `mdwrk/tools/conformance/validate-component-classname-styling.mjs` | Core/shared tooling |
| `tools/conformance/validate-extension-artifacts.mjs` | migrated | `mdwrk/tools/conformance/validate-extension-artifacts.mjs` | Core/shared tooling |
| `tools/conformance/validate-extension-manifests.mjs` | migrated | `mdwrk/tools/conformance/validate-extension-manifests.mjs` | Core/shared tooling |
| `tools/conformance/validate-markdown-profile-evidence-lanes.mjs` | migrated | `mdwrk/tools/conformance/validate-markdown-profile-evidence-lanes.mjs` | Core/shared tooling |
| `tools/conformance/validate-package-exports.mjs` | migrated | `mdwrk/tools/conformance/validate-package-exports.mjs` | Core/shared tooling |
| `tools/docs/generate-readmes.mjs` | migrated | `mdwrk/tools/docs/generate-readmes.mjs` | Core/shared tooling |
| `tools/extensions/build-installable-extensions.mjs` | migrated | `mdwrk/tools/extensions/build-installable-extensions.mjs` | Core/shared tooling |
| `tools/extensions/sign-extension-artifacts.mjs` | migrated | `mdwrk/tools/extensions/sign-extension-artifacts.mjs` | Core/shared tooling |
| `tools/governance/common.mjs` | migrated | `mdwrk/tools/governance/common.mjs` | Core/shared tooling |
| `tools/governance/lint-claim-language.mjs` | migrated | `mdwrk/tools/governance/lint-claim-language.mjs` | Core/shared tooling |
| `tools/governance/mdwrk-docs-governance.mjs` | migrated | `mdwrk/tools/governance/mdwrk-docs-governance.mjs` | Core/shared tooling |
| `tools/governance/mdwrk-docs-governance.test.mjs` | migrated | `mdwrk/tools/governance/mdwrk-docs-governance.test.mjs` | Core/shared tooling |
| `tools/governance/mdwrk-extension-contributions.mjs` | migrated | `mdwrk/tools/governance/mdwrk-extension-contributions.mjs` | Core/shared tooling |
| `tools/governance/mdwrk-extension-contributions.test.mjs` | migrated | `mdwrk/tools/governance/mdwrk-extension-contributions.test.mjs` | Core/shared tooling |
| `tools/governance/mdwrk-lander-package-suite.mjs` | migrated | `mdwrk-pages/tools/governance/mdwrk-lander-package-suite.mjs` | Pages/lander suite governance |
| `tools/governance/mdwrk-lander-package-suite.test.mjs` | migrated | `mdwrk-pages/tools/governance/mdwrk-lander-package-suite.test.mjs` | Pages/lander suite governance |
| `tools/governance/mdwrk-package-cr-order.mjs` | migrated | `mdwrk/tools/governance/mdwrk-package-cr-order.mjs` | Core/shared tooling |
| `tools/governance/mdwrk-package-cr-order.test.mjs` | migrated | `mdwrk/tools/governance/mdwrk-package-cr-order.test.mjs` | Core/shared tooling |
| `tools/governance/mdwrkcom-thin-host.mjs` | migrated | `mdwrk-com/tools/governance/mdwrkcom-thin-host.mjs` | Public website thin-host governance |
| `tools/governance/mdwrkcom-thin-host.test.mjs` | migrated | `mdwrk-com/tools/governance/mdwrkcom-thin-host.test.mjs` | Public website thin-host governance |
| `tools/governance/validate-certifiability-feature-plan.mjs` | migrated | `mdwrk/tools/governance/validate-certifiability-feature-plan.mjs` | Core/shared tooling |
| `tools/governance/validate-doc-feature-pages.mjs` | migrated | `mdwrk/tools/governance/validate-doc-feature-pages.mjs` | Core/shared tooling |
| `tools/governance/validate-doc-pointers.mjs` | migrated | `mdwrk/tools/governance/validate-doc-pointers.mjs` | Core/shared tooling |
| `tools/governance/validate-generated-artifacts.mjs` | migrated | `mdwrk/tools/governance/validate-generated-artifacts.mjs` | Core/shared tooling |
| `tools/governance/validate-governance-suite.mjs` | migrated | `mdwrk/tools/governance/validate-governance-suite.mjs` | Core/shared tooling |
| `tools/governance/validate-mdwrk-docs-governance.mjs` | migrated | `mdwrk/tools/governance/validate-mdwrk-docs-governance.mjs` | Core/shared tooling |
| `tools/governance/validate-mdwrk-extension-contributions.mjs` | migrated | `mdwrk/tools/governance/validate-mdwrk-extension-contributions.mjs` | Core/shared tooling |
| `tools/governance/validate-mdwrk-lander-package-suite.mjs` | migrated | `mdwrk-pages/tools/governance/validate-mdwrk-lander-package-suite.mjs` | Pages/lander suite governance |
| `tools/governance/validate-mdwrk-package-cr-order.mjs` | migrated | `mdwrk/tools/governance/validate-mdwrk-package-cr-order.mjs` | Core/shared tooling |
| `tools/governance/validate-mdwrkcom-thin-host.mjs` | migrated | `mdwrk-com/tools/governance/validate-mdwrkcom-thin-host.mjs` | Public website thin-host governance |
| `tools/governance/validate-release-notes.mjs` | migrated | `mdwrk/tools/governance/validate-release-notes.mjs` | Core/shared tooling |
| `tools/governance/validate-release-snapshots.mjs` | migrated | `mdwrk/tools/governance/validate-release-snapshots.mjs` | Core/shared tooling |
| `tools/governance/validate-root-clutter.mjs` | migrated | `mdwrk/tools/governance/validate-root-clutter.mjs` | Core/shared tooling |
| `tools/governance/validate-spec-coverage-index.mjs` | migrated | `mdwrk/tools/governance/validate-spec-coverage-index.mjs` | Core/shared tooling |
| `tools/governance/validate-ssot-graph-export.mjs` | migrated | `mdwrk/tools/governance/validate-ssot-graph-export.mjs` | Core/shared tooling |
| `tools/governance/validate-tree.mjs` | migrated | `mdwrk/tools/governance/validate-tree.mjs` | Core/shared tooling |
| `tools/governance/validate-wip-notes.mjs` | migrated | `mdwrk/tools/governance/validate-wip-notes.mjs` | Core/shared tooling |
| `tools/governance/write-release-snapshot.mjs` | migrated | `mdwrk/tools/governance/write-release-snapshot.mjs` | Core/shared tooling |
| `tools/governance/write-ssot-graph-export.mjs` | migrated | `mdwrk/tools/governance/write-ssot-graph-export.mjs` | Core/shared tooling |
| `tools/lib/workspace.mjs` | copied | `mdwrk-com/tools/lib/workspace.mjs` | Shared helper required by site governance tools |
| `tools/lib/workspace.mjs` | copied | `mdwrk-pages/tools/lib/workspace.mjs` | Shared helper required by Pages governance tools |
| `tools/lib/workspace.mjs` | migrated | `mdwrk/tools/lib/workspace.mjs` | Shared workspace helper; copied to owner repos that use migrated governance tools |
| `tools/mcp/prove-mcp-setup.mjs` | migrated | `mdwrk/tools/mcp/prove-mcp-setup.mjs` | Core/shared tooling |
| `tools/mcp/setup-mcp.sh` | migrated | `mdwrk/tools/mcp/setup-mcp.sh` | Core/shared tooling |
| `tools/README.md` | migrated | `mdwrk/tools/README.md` | Core/shared tooling |
| `tools/release/build-publish-graph.mjs` | migrated | `mdwrk/tools/release/build-publish-graph.mjs` | Core/shared tooling |
| `tools/release/build-publish-graph.test.mjs` | migrated | `mdwrk/tools/release/build-publish-graph.test.mjs` | Core/shared tooling |
| `tools/release/build-versioned-client.mjs` | migrated | `mdwrk-studio/tools/release/build-versioned-client.mjs` | Versioned PWA client release helper |
| `tools/release/generate-phase1-release-train-audit.mjs` | migrated | `mdwrk/tools/release/generate-phase1-release-train-audit.mjs` | Core/shared tooling |
| `tools/release/generate-release-evidence.mjs` | migrated | `mdwrk/tools/release/generate-release-evidence.mjs` | Core/shared tooling |
| `tools/release/pack-workspaces.mjs` | migrated | `mdwrk/tools/release/pack-workspaces.mjs` | Core/shared tooling |
| `tools/release/run-changesets.mjs` | migrated | `mdwrk/tools/release/run-changesets.mjs` | Core/shared tooling |
| `tools/release/run-publish.mjs` | migrated | `mdwrk/tools/release/run-publish.mjs` | Core/shared tooling |
| `tools/release/verify-publish-packages.mjs` | migrated | `mdwrk/tools/release/verify-publish-packages.mjs` | Core/shared tooling |
| `tsconfig.base.json` | archived | `` | Repo-local equivalent already exists, should be regenerated, or remains in monorepo archive |
| `uv.lock` | archived | `` | Repo-local equivalent already exists, should be regenerated, or remains in monorepo archive |
