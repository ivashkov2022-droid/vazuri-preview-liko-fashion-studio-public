# Frozen banner-family case package

This package changes only the isolated banner/beacon overlay. Runtime files are exact bytes from the locally verified candidate; original page bodies and media are preserved.

Restore the complete case from the immutable base snapshot below, then copy `runtime/` over that snapshot. Verify every original file with `BASE-MANIFEST.json` before applying the delta, and every final file with `CURRENT-MANIFEST.json` afterwards. The manifests use release-relative paths including the case directory. No site rebuild is needed.

Base: https://github.com/ivashkov2022-droid/vazuri-site/tree/vazuri-io-live-20261025-110217/published/vazuri-io/vazuri-preview-liko-fashion-studio-public

Immutable source commit: `e3812568b20e0fb64c3f60b7aa02f8b698e48937`.

`ledger.json`, `qa-summary.json`, `static-review.json`, and `PACKAGE.json` bind the delta and its local QA. The complete-current ZIP is stored outside Git in the project release directory and also includes full runtime/media plus the committed source snapshot.
