// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { bcs } from "@mysten/sui.js/bcs";
import { fromB64, fromHEX, toHEX } from "@mysten/sui.js/utils";
import { useEffect, useRef, useState } from "react";
import { Box, Container, Text, Heading, Link } from "@radix-ui/themes";
import { useSuiClient } from "@mysten/dapp-kit";
import { useNetworkVariable } from "./networkConfig";
import { SuiClient } from "@mysten/sui.js/client";

// Object definitions that mirror the on chain ones
type Color = {
    r: number;
    g: number;
    b: number;
};

type Flatlander = {
    id: string;
    color: Color;
    sides: number;
};

// Define UID as a 32-byte array, then add a transform to/from hex strings.
const UID = bcs.fixedArray(32, bcs.u8()).transform({
    input: (id: string) => fromHEX(id),
    output: (id) => toHEX(Uint8Array.from(id)),
});

const ColorStruct = bcs.struct("Color", {
    r: bcs.u8(),
    g: bcs.u8(),
    b: bcs.u8(),
});

const FlatlanderStruct = bcs.struct("Flatlander", {
    id: UID,
    color: ColorStruct,
    sides: bcs.u8(),
});

async function getFlatlander(
    client: SuiClient,
    objectId: string,
    flatlanderType: string,
): Promise<Flatlander | null> {
    const obj = await client.getObject({
        id: objectId,
        options: { showBcs: true, showType: true },
    });

    if (
        obj.data &&
        obj.data.bcs &&
        obj.data.bcs.dataType === "moveObject" &&
        obj.data.type === flatlanderType
    ) {
        let struct = FlatlanderStruct.parse(fromB64(obj.data.bcs.bcsBytes));
        return struct as Flatlander;
    }

    return null;
}

function colorString(color: Color): string {
    return `${color.r}, ${color.g}, ${color.b}`;
}

interface FlatlanderViewProps {
    objectId: string;
}

export function FlatlanderView({ objectId }: FlatlanderViewProps) {
    const flatlanderType = useNetworkVariable("flatlanderPackageId") + "::flatland::Flatlander";
    const [flatlander, setFlatlander] = useState<Flatlander | null>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const client = useSuiClient();

    useEffect(() => {
        getFlatlander(client, objectId, flatlanderType).then(setFlatlander);
    }, [objectId]);

    useEffect(() => {
        if (!flatlander || !svgRef.current) return;

        const radius = 50;
        const centerX = 100;
        const centerY = 100;
        const sides = flatlander.sides;
        const angle = (Math.PI * 2) / sides;
        const offset = -Math.PI / 2;
        const color = colorString(flatlander.color);

        // Change the css color variable and background color
        document.documentElement.style.setProperty("--color", `rgb(${color})`);
        document.body.style.backgroundColor = `rgba(${color}, 0.1)`;

        // Clear previous SVG content
        svgRef.current.innerHTML = "";

        const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        polygon.setAttribute("fill", `rgb(${color})`);
        let points = "";
        for (let i = 0; i < sides; i++) {
            points += `${centerX + radius * Math.cos(angle * i + offset)},
                ${centerY + radius * Math.sin(angle * i + offset)} `;
        }
        polygon.setAttribute("points", points);

        const anim = document.createElementNS("http://www.w3.org/2000/svg", "animateTransform");
        anim.setAttribute("attributeName", "transform");
        anim.setAttribute("begin", "0s");
        anim.setAttribute("dur", "10s");
        anim.setAttribute("type", "rotate");
        anim.setAttribute("from", "0 100 100");
        anim.setAttribute("to", "360 100 100");
        anim.setAttribute("repeatCount", "indefinite");

        polygon.appendChild(anim);
        svgRef.current.appendChild(polygon);
    }, [flatlander]);

    document.title = "View your Flatlander!";

    if (!flatlander) {
        return (
            <Container size="2">
                <Container
                    size="1"
                    mt="5"
                    pt="2"
                    px="4"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "100vh",
                    }}
                >
                    <Heading mb="4">Uh oh! The provided ID is not a Flatlander...</Heading>
                    <Text>
                        Go back to the <Link href="/">main page</Link> and mint a new one!
                    </Text>
                </Container>
            </Container>
        );
    }

    return (
        <Container size="1">
            <Container
                size="1"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: "100vh",
                }}
                mx="3"
            >
                <Box id="picture" mb="4" style={{ display: "flex", justifyContent: "center" }}>
                    <svg
                        ref={svgRef}
                        width="200"
                        height="200"
                        id="flatland"
                        xmlns="http://www.w3.org/2000/svg"
                    />
                </Box>
                <Box id="text" style={{ color: "var(--color)" }}>
                    <Heading size="7" mb="4" align="center">
                        your flatlander
                    </Heading>
                    <Text>
                        the color and the number of sides is taken from the NFT;
                        <br />
                        this URL is unique to this Flatlander, and always will be.
                    </Text>
                </Box>
            </Container>
        </Container>
    );
}
