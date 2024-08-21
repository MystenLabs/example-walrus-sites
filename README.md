# A collection of example Walrus Sites

## Contirbuting

If you are considering contributing, please read our [contributing guidelines](CONTRIBUTING.md).

## The examples

- `capacity`: A site showing the utilization of storage on Walrus, as well as the blob registration events. https://capacity.walrus.site
- `flatland`: Site showcasing automated site generation from NFTs. https://flatland.walrus.site
- `publish`: Allows to publish blob to Walrus. This has been taken from the [Walrus docs
  examples](https://github.com/MystenLabs/walrus-docs/tree/main/examples/javascript). https://publish.walrus.site
- `redirect-blog`: A simple redirect from `blog` to a specific `docs` page. Currently only redirects to the `walrus.site`
  portal. https://publish.walrus.site
- `walrus-snake`: The simple snake-like game featuring a walrus. https://walrusgame.walrus.site

## Sites update script

The `update_all_sites.py` script is used to update all the sites in this repo at the same time.
Note that to run the script, you _must_ have:

* the Sui CLI, configured with the wallet the _owns_ the sites;
* the Walrus CLI and config; and
* the Walrus Sites CLI and config.

Uses Python 3.11, with Pydantic and Pyyaml as dependencies.
