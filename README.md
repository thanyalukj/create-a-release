# create-a-release

This action create a release with a release notes

## Usage

```yaml
- name: Create a GitHub Release
  id: create_release
  uses: thanyalukj/create-a-release@v1.0.0
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  with:
    tag_name: '1.0.0'
    release_name: 'v1.0.0'
    body: 'release notes'
    draft: false
    prerelease: false
    generate_release_notes: true
```

## Inputs

| NAME                     | DESCRIPTION                                                                | REQUIRED | DEFAULT |
| ------------------------ | -------------------------------------------------------------------------- | -------- | ------- |
| `tag_name`               | The name of the tag.                                                       | `true`   |         |
| `release_name`           | The name of the release.                                                   | `true`   |         |
| `body`                   | The the contents of the release.                                           | `false`  |         |
| `draft`                  | Identify a draft (unpublished) (`true`) or a published release (`false`).  | `false`  | `false` |
| `prerelease`             | Identify the release as a prerelease (`true`) or a full release (`false`). | `false`  | `false` |
| `generate_release_notes` | Whether to automatically generate the body for this release.               | `false`  | `false` |
