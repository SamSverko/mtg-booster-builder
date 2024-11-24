"use client";

import { useMemo, useState } from "react";

import {
    BoosterAllocation,
    CardCount,
    ConfirmDetails,
    FormatSelect,
    PlayerCountInput,
} from "@/app/components";
import { FORMAT_NONE, PLAY_BOOSTER } from "@/app/constants";
import { useCards } from "@/app/hooks";
import { Format, ManaBoxCard, SetCodeWithCardCount } from "@/app/types";
import { getBoosters } from "@/app/utils";

import styles from "@/app/page.module.scss";

export default function Home() {
    const { data, isLoading } = useCards();

    const [format, setFormat] = useState<Format>(FORMAT_NONE);
    const [playerCount, setPlayerCount] = useState<number>(
        format.minPlayerCount || 1
    );
    const [boosterAllocation, setBoosterAllocation] = useState<
        SetCodeWithCardCount[]
    >([]);
    const [generatedBoosters, setGeneratedBoosters] = useState<ManaBoxCard[][]>(
        []
    );

    const boosterRequirements = useMemo(() => {
        if (!format || !format.boosterPerPlayerCount) {
            return {
                boosterCount: playerCount,
                cardCountPerSet: playerCount * PLAY_BOOSTER.slots.length,
            };
        }

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
                cardCountPerSet={boosterRequirements.cardCountPerSet}
                format={format}
                isLoading={isLoading}
                onChange={setBoosterAllocation}
                playerCount={playerCount}
                setCodesWithCardCount={data?.setCodesWithCardCount || []}
                value={boosterAllocation}
            />

            <hr />

            <h2>Step 3: Confirm details</h2>

            <ConfirmDetails
                boosterAllocation={boosterAllocation}
                boosterCount={boosterRequirements.boosterCount}
                cardCountPerSet={boosterRequirements.cardCountPerSet}
            />

            <hr />

            <h2>Step 4: Generate boosters</h2>

            {/* TODO - make this its own component */}
            <button
                disabled={boosterAllocation.length === 0}
                onClick={
                    data.cards
                        ? () =>
                              setGeneratedBoosters(
                                  getBoosters(data.cards, boosterAllocation)
                              )
                        : undefined
                }
            >
                Generate boosters
            </button>

            {/* TODO - add error (or lack of) feedback here */}

            <hr />

            <h2>Step 5: Enjoy your boosters</h2>

            {/* TODO - save to local host for safe-refreshing! */}
            {/* TODO - make this its own component */}
            {generatedBoosters.map((booster, index) => (
                <details key={index}>
                    <summary>
                        Booster {index + 1} ({booster[0].setCode})
                    </summary>
                    <ul>
                        {booster.map((card) => (
                            <li key={card.scryfallID}>
                                {card.collectorNumber} - {card.name}
                                {card.foil === "foil" ? " (foil)" : ""}
                            </li>
                        ))}
                    </ul>
                </details>
            ))}
        </div>
    );
}
