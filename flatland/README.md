# Flatland
A demo for a dApp on Walrus Sites, with minting and per-NFT sites.

## Repo structure

### `mint-site`
The dApp Walrus Site that mints the NFTs. You can see the site at https://flatland.walrus.site
To mint the NFT, you need to connect your wallet and set the wallet's network to `Testnet`
![wallet-testnet](./doc-assets/wallet.png)

You will need to faucet some testnet tokens to mint the NFT. To mint the NFT, click on `Mint a new Flatlander`
![mint](./doc-assets/mint.png)

Once you mint the NFT, you will see a link to the `nft-viz` site.
![nft-viz-link](./doc-assets/nft-viz-link.png)

### `nft-viz`
This site is linked from the minting site, and is also linked from the NFTs Display standard.
Once you click on the link from the minting site, you will be taken to the `nft-viz` site. This site is unique for each NFT.
![nft-viz](./doc-assets/nft-viz.png)
You can read more about how the redirects work at https://docs.walrus.ai/docs/redirects

### `move/flatland`
The contract code for minting the NFTs.

### Redeployment

0. For convenience, use this alias for the site builder: `alias site-builder="<path-to-walrus-sites-repo>/target/release/site-builder --config site-builder/assets/builder-example.yaml"`

1. Publish nft-viz to walrus sites: 

`cd nft-viz && pnpm run build && cp index.html dist/ && site-builder publish <path-to-nft-viz-dist>`.

2. In `flatland.move` update the `const VISUALIZATION_SITE: address = @<new-object-id-of-nft-viz>`.

3. Redeploy the contract `cd move/flatland && sui client publish`.

4. Update the `FLATLAND_PACKAGE` in `nft-viz/src/index.ts`.

5. Update the nft-viz `cd nft-viz && pnpm run build && cp index.html dist/ && site-builder update <path-to-nft-viz>/dist <VISUALIZATION_SITE_OID>`

6. Update the `TESTNET_FLATLAND_PACKAGE_ID` inside `mint-site/src/constants.ts` and deploy to WS: `cd mint-site && pnpm run build && site-builder publish <path-to-mint-site>/dist`.