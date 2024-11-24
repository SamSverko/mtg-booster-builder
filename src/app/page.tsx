"use client";

import { useMemo, useState } from "react";

import {
    CardCount,
    FormatSelect,
    PlayerCountInput,
    SetSelection,
} from "@/app/components";
import { FORMAT_NONE, PLAY_BOOSTER } from "@/app/constants";
import { useCards } from "@/app/hooks";
import { SetCodeWithCardCount } from "@/app/types";
import styles from "@/app/page.module.scss";

export default function Home() {
    const { cards, isLoading } = useCards();

    const [format, setFormat] = useState(FORMAT_NONE);
    const [playerCount, setPlayerCount] = useState(FORMAT_NONE.minPlayerCount);
    const [selectedSets, setSelectedSets] = useState<SetCodeWithCardCount[]>(
        []
    );

    const boosterRequirements = useMemo(() => {
        const boosterCount = !format.boosterPerPlayerCount
            ? playerCount
            : Math.ceil(playerCount * format.boosterPerPlayerCount);

        const cardCountPerSet = boosterCount * PLAY_BOOSTER.slots.length;

        return { boosterCount, cardCountPerSet };
    }, [format, playerCount]);

    return (
        <div className={styles.container}>
            <h1>MTG Booster Builder</h1>

            <hr />

            <h2>Step 1: Import your cards</h2>
            {/* TODO - make this an input so you can upload your .csv file */}
            <CardCount cardCount={cards?.length} isLoading={isLoading} />

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
                {format.name === FORMAT_NONE.name ? "boosters" : "players"}
            </h3>

            <PlayerCountInput
                aria-labelledby="player-count-label"
                format={format}
                onChange={setPlayerCount}
                value={playerCount}
            />

            <h3>Set(s)</h3>

            <SetSelection
                boosterCount={boosterRequirements.boosterCount}
                cardCountPerSet={boosterRequirements.cardCountPerSet}
                cards={cards}
                format={format}
                isLoading={isLoading}
                onChange={setSelectedSets}
                playerCount={playerCount}
                value={selectedSets}
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
