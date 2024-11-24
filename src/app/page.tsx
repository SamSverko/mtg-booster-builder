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
    function generateBoosters(
        cards: ManaBoxCard[] | null,
        boosterAllocation: SetCodeWithCardCount[]
    ) {
        if (!cards || cards.length === 0) {
            console.log("No cards available to generate boosters.");
            return;
        }

        boosterAllocation.forEach((setCodeWithCardCount) => {
            const { allocatedBoosterCount, setCode } = setCodeWithCardCount;

            if (allocatedBoosterCount <= 0) {
                console.log(
                    `Skipping ${setCode} as allocated boosters count is 0 or less.`
                );
                return;
            }

            console.log(
                `Generating ${allocatedBoosterCount} boosters for ${setCode}`
            );

            const setCards = cards.filter((card) => card.setCode === setCode);

            if (setCards.length === 0) {
                console.log(`No cards found for set code: ${setCode}`);
            } else {
                console.log(
                    `Found ${setCards.length} cards for set code: ${setCode}`
                );
            }

            // TODO - generate boosters based on setCards and allocatedBoosterCount
        });
    }

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

            <button
                disabled={boosterAllocation.length === 0}
                onClick={
                    data.cards
                        ? () => generateBoosters(data.cards, boosterAllocation)
                        : undefined
                }
            >
                Generate boosters
            </button>
        </div>
    );
}
