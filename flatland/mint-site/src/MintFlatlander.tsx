// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Transaction } from "@mysten/sui/transactions";
import { Button, Container } from "@radix-ui/themes";
import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit";
import { useNetworkVariable } from "./networkConfig";
import { SuiTransactionBlockResponse } from "@mysten/sui/client";

export function MintFlatlander({ onCreated }: { onCreated: (id: string) => void }) {
    const flatlanderPackageId = useNetworkVariable("flatlanderPackageId");
    const client = useSuiClient();
    const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction({
        execute: async ({ bytes, signature }) =>
            await client.executeTransactionBlock({
                transactionBlock: bytes,
                signature,
                options: {
                    // Raw effects are required so the effects can be reported back to the wallet
                    showRawEffects: true,
                    // Select additional data to return
                    showObjectChanges: true,
                },
            }),
    });

    return (
        <Container my="2">
            <Button variant="surface" onClick={() => create()}>
                Mint a new Flatlander
            </Button>
        </Container>
    );

    function create() {
        const txb = new Transaction();

        txb.moveCall({
            arguments: [txb.object("0x8")], // 0x8 is the Random Object
            target: `${flatlanderPackageId}::flatland::mint`,
        });

        signAndExecuteTransaction(
            { transaction: txb, },
            { onSuccess: (tx) => onSuccess(tx as SuiTransactionBlockResponse) },
        );
    }

    function onSuccess(tx: SuiTransactionBlockResponse) {
        if (tx.effects?.created === undefined) {
            return;
        }

        for (const created of tx.effects.created) {
            const objectId = created.reference?.objectId;
            const owner = created.owner;
            if (typeof owner !== "string" && "AddressOwner" in owner) {
                if (objectId) {
                    onCreated(objectId);
                    return;
                }
            }
        }
    }
}
