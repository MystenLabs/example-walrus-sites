// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { TransactionBlock } from "@mysten/sui.js/transactions";
import { Button, Container } from "@radix-ui/themes";
import { useSignAndExecuteTransactionBlock } from "@mysten/dapp-kit";
import { useNetworkVariable } from "./networkConfig";
import { SuiTransactionBlockResponse } from "@mysten/sui.js/client";

export function MintFlatlander({ onCreated }: { onCreated: (id: string) => void }) {
    const flatlanderPackageId = useNetworkVariable("flatlanderPackageId");
    const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();

    return (
        <Container my="2">
            <Button variant="surface" onClick={() => create()}>
                Mint a new Flatlander
            </Button>
        </Container>
    );

    function create() {
        const txb = new TransactionBlock();

        txb.moveCall({
            arguments: [txb.object("0x8")], // 0x8 is the Random Object
            target: `${flatlanderPackageId}::flatland::mint`,
        });

        signAndExecute(
            { transactionBlock: txb, options: { showEffects: true, showObjectChanges: true } },
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
