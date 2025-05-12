# A collection of example Walrus Sites

## Contributing

If you are considering contributing, please read our [contributing guidelines](CONTRIBUTING.md).

## The examples

- `flatland`: Site showcasing automated site generation from NFTs. https://flatland.wal.app
- `walrus-snake`: The simple snake-like game featuring a walrus. https://walrusgame.wal.app

### Deprecated examples

- `capacity`: A site showing the utilization of storage on Walrus, as well as the blob registration events.
- `publish`: Allows to publish blob to Walrus. This has been taken from the [Walrus docs
  examples](https://github.com/MystenLabs/walrus/tree/main/docs/examples/javascript).

## Sites update script

The `update_all_sites.py` script is used to update all the sites in this repo at the same time.
Note that to run the script, you _must_ have:

* the Sui CLI, configured with the wallet the _owns_ the sites;
* the Walrus CLI and config; and
* the Walrus Sites CLI and config.

Uses Python 3.11, with Pydantic and Pyyaml as dependencies.
