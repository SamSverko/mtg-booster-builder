"use client";

import { useMemo, useState } from "react";

import {
    BoosterAllocation,
    CardCount,
    FormatSelect,
    PlayerCountInput,
} from "@/app/components";
import { FORMAT_NONE, PLAY_BOOSTER } from "@/app/constants";
import { useCards } from "@/app/hooks";
import { SetCodeWithCardCount } from "@/app/types";
import styles from "@/app/page.module.scss";

export default function Home() {
    const { data, isLoading } = useCards();

    const [format, setFormat] = useState(FORMAT_NONE);
    const [playerCount, setPlayerCount] = useState(format.minPlayerCount || 1);
    const [boosterAllocation, setBoosterAllocation] = useState<
        SetCodeWithCardCount[]
    >([]);

    const boosterRequirements = useMemo(() => {
        if (!format || !format.boosterPerPlayerCount)
            return { boosterCount: 0, cardCountPerSet: 0 };
        const boosterCount = Math.ceil(
            playerCount * format.boosterPerPlayerCount
        );
        const cardCountPerSet = boosterCount * PLAY_BOOSTER.slots.length;
        return { boosterCount, cardCountPerSet };
    }, [format, playerCount]);

    return (
        <div className={styles.container}>
            <h1>MTG Booster Builder</h1>

            <hr />

            <h2>Step 1: Import your cards</h2>
            {/* TODO - make this an input so you can upload your .csv file */}
            <CardCount cardCount={data.cards?.length} isLoading={isLoading} />

            <hr />

            <h2>Step 2: Choose your setup</h2>

            <h3 id="format-label">Format</h3>
            {/* TODO - show format details */}
            <FormatSelect
                aria-labelledby="format-label"
                onChange={setFormat}
                value={format}
            />

            <h3 id="player-count-label">
                Number of{" "}
                {format?.name === FORMAT_NONE.name ? "boosters" : "players"}
            </h3>

            <PlayerCountInput
                aria-labelledby="player-count-label"
                format={format}
                onChange={setPlayerCount}
                value={playerCount}
            />

            <h3>Set(s)</h3>

            <BoosterAllocation
                boosterCount={boosterRequirements.boosterCount}
                format={format}
                isLoading={isLoading}
                onChange={setBoosterAllocation}
                playerCount={playerCount}
                setCodesWithCardCount={data?.setCodesWithCardCount || []}
                value={boosterAllocation}
            />

            <hr />

            <h2>Step 3: Confirm details</h2>

            <ul>
                <li>
                    <b>Number of cards required:</b>{" "}
                    {boosterRequirements.cardCountPerSet}
                </li>
                <li>
                    <b>Total number of boosters to be generated:</b>{" "}
                    {boosterRequirements.boosterCount}
                </li>
            </ul>
        </div>
    );
}
