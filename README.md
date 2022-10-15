# auto-label-per-user
A node action for assigning a label to a PR according the author.

This action is intended to assign a label to different users. When a PR is opened, a label is assigned according to the PR author.

## Inputs

## `git-token`

**Required** A GITHUB_SECRET with enough permissions to add a file.

## `default-label`

A string to be used if the author of the PR has no label assigned. This field is optional, is there is no default label and no assignment, then the PR its not labeled.

## `user-team-map`

A map of `git-user`:`label-name`.

## Outputs
This action has no outputs.

## Example usage

```
uses: rodrigoarias/auto-label-per-user@v1.0.0
with:
  git-token: ${{ secrets.GITHUB_TOKEN }}
  default-label: "default"
  user-team-map: |
            {
            "rodrigoarias":"team-a"
            "anotheruser":"team-b"
            }
```
