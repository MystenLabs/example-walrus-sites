# How to Contribute

## GitHub flow

We generally follow the [GitHub flow](https://docs.github.com/en/get-started/quickstart/github-flow) in our project. In
a nutshell, this requires the following steps to contribute:

1. [Fork the repository](https://docs.github.com/en/get-started/quickstart/contributing-to-projects) (only required if
   you don't have write access to the repository).
1. [Create a feature branch](https://docs.github.com/en/get-started/quickstart/github-flow#create-a-branch).
1. [Make changes and create a
   commit](https://docs.github.com/en/get-started/quickstart/contributing-to-projects#making-and-pushing-changes)
1. Push your changes to GitHub and [create a pull
   request](https://docs.github.com/en/get-started/quickstart/contributing-to-projects#making-a-pull-request) (PR);
   note that we enforce a particular style for the PR titles, see [below](#commit-messages).
1. Wait for maintainers to review your changes and, if necessary, revise your PR.
1. When all requirements are met, a reviewer or the PR author (if they have write permissions) can merge the PR.

## Commit messages

To ensure a consistent Git history (from which we can later easily generate changelogs automatically), we always squash
commits when merging a PR and enforce that all PR titles comply with the [conventional-commit
format](https://www.conventionalcommits.org/en/v1.0.0/). For examples, please take a look at our [commit
history](https://github.com/MystenLabs/walrus/commits/main).

## Pre-commit hooks

We have CI jobs running for every PR to test and lint the repository. You can install Git pre-commit hooks to ensure
that these check pass even *before pushing your changes* to GitHub. To use this, the following steps are required:

1. Install [Rust](https://www.rust-lang.org/tools/install).
1. [Install pre-commit](https://pre-commit.com/#install) using `pip` or your OS's package manager.
1. Run `pre-commit install` in the repository.

After this setup, the code will be checked, reformatted, and tested whenever you create a Git commit.

You can also use a custom pre-commit configuration if you wish:

1. Create a file `.custom-pre-commit-config.yaml` (this is set to be ignored by Git).

## Signed commits

We appreciate it if you configure Git to [sign your
commits](https://gist.github.com/troyfontaine/18c9146295168ee9ca2b30c00bd1b41e).
