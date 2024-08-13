import { TransactionBlock } from "@mysten/sui.js/transactions";
import { Button, Container } from "@radix-ui/themes";
import {
  useSignAndExecuteTransactionBlock,
  useSuiClient,
} from "@mysten/dapp-kit";
import { useNetworkVariable } from "./networkConfig";

export function MintFlatlander({
  onCreated,
}: {
  onCreated: (id: string) => void;
}) {
  const client = useSuiClient();
  const flatlanderPackageId = useNetworkVariable("flatlanderPackageId");
  const { mutate: signAndExecute } = useSignAndExecuteTransactionBlock();

  return (
    <Container my="2">
      <Button
      variant="surface"
        onClick={() => {
          create();
        }}
      >
        Mint a new Flatlander
      </Button>
    </Container>
  );

  function create() {
    const txb = new TransactionBlock();

    txb.moveCall({
      arguments: [],
      target: `${flatlanderPackageId}::flatland::mint`,
    });

    signAndExecute(
      {
        transactionBlock: txb,
        options: {
          showEffects: true,
          showObjectChanges: true,
        },
      },
      {
        onSuccess: (tx) => {
          client
            .waitForTransactionBlock({
              digest: tx.digest,
            })
            .then(() => {
              if (tx.effects?.created === undefined) {
                return;
              }
              for (const created of tx.effects.created) {
                const objectId = created.reference?.objectId;
                const owner = created.owner;
                if (typeof(owner) !== 'string' && 'AddressOwner' in owner) {
                  if (objectId) {
                    onCreated(objectId);
                    return;
                  }
                }
              }
            });
        },
      },
    );
  }
}
