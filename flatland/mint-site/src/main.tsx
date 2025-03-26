// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import React from "react";
import ReactDOM from "react-dom/client";
import "@mysten/dapp-kit/dist/index.css";
import "@radix-ui/themes/styles.css";

import { SuiClientProvider, WalletProvider } from "@mysten/dapp-kit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Theme } from "@radix-ui/themes";
import App from "./App.tsx";
import { networkConfig } from "./networkConfig.ts";
import { NETWORK_IN_USE } from "./constants.ts";

const queryClient = new QueryClient();

const selectedNetwork = NETWORK_IN_USE as keyof typeof networkConfig;

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Theme appearance="light" accentColor="orange" radius="full">
            <QueryClientProvider client={queryClient}>
                <SuiClientProvider networks={networkConfig} network={selectedNetwork}>
                    <WalletProvider autoConnect>
                        <App />
                    </WalletProvider>
                </SuiClientProvider>
            </QueryClientProvider>
        </Theme>
    </React.StrictMode>,
);
