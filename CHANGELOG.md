# Changelog

<!-- AUTO-CHANGELOG-INSERT -->
<!-- AUTO-CHANGELOG-v2-START -->
## v2 — 2026-09-10T12:41:57Z

- Release commit: `1f176ad5f5ef40a1a79e584a7fed36a82f7d8adb`
- Artifact: `evrasia-hd-v2.apk`
- SHA-256: `647ecff88e0d96874bda543afd2244edc667f85bd2a456cd2c834b22ecd95576`
- Previous release: **v1**

### Changes

- ci: remove APK assets from previous releases
- ci: keep APKs for current and previous releases
- ci: migrate Evrasia HD to universal release standard
- ci: fix private validation and signing fingerprint
- ci: pin Evrasia HD signing certificate
- ci: finalize APK validation pipeline
- ci: make release summaries shell-safe
- release: publish v2 [release]

### Changed files

- `.github/actions/build-apk/action.yml`
- `.github/dependabot.yml`
- `.github/scripts/update-release-docs.py`
- `.github/workflows/_release-apk.yml`
- `.github/workflows/_release-core.yml`
- `.github/workflows/android-apk.yml`
- `.github/workflows/validate-work-branches.yml`
- `app.config.ts`
<!-- AUTO-CHANGELOG-v2-END -->
<!-- AUTO-CHANGELOG-v1-START -->
## v1 — 2026-09-09T17:52:10Z

- Release commit: `2b27b70d7b337254ea7d2e93fe2647a5a2184407`
- Artifact: `evrasia-hd-v1-arm64.apk`
- SHA-256: `efa17550ad737ac10f9b77042994985e941736f80e4f3c51a7bf443f6ad0fa6b`
- Previous release: **—**

### Changes

- chore: initialize clean repository
- release: v1 initial clean copy of Evrasia HD v45 [release]
- ci: handle first release with empty tag history [release]
- ci: fix first-release version detection [release]
- ci: rebuild clean release workflow [release]

### Changed files

- `.github/workflows/android-apk.yml`
<!-- AUTO-CHANGELOG-v1-END -->
