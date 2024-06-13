import { getFullnodeUrl } from "@mysten/sui.js/client";
import {
  TESTNET_FLATLAND_PACKAGE_ID,
MAINNET_FLATLAND_PACKAGE_ID,
} from "./constants.ts";
import { createNetworkConfig } from "@mysten/dapp-kit";

const { networkConfig, useNetworkVariable, useNetworkVariables } =
  createNetworkConfig({
    testnet: {
      url: getFullnodeUrl("testnet"),
      variables: {
        flatlanderPackageId: TESTNET_FLATLAND_PACKAGE_ID,
      },
    },
    mainnet: {
      url: getFullnodeUrl("mainnet"),
      variables: {
        flatlanderPackageId: MAINNET_FLATLAND_PACKAGE_ID,
      },
    },
  });

export { useNetworkVariable, useNetworkVariables, networkConfig };
