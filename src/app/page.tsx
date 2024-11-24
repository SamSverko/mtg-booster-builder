"use client";

import { useEffect, useMemo, useState } from "react";

import {
    FORMAT_BOOSTER_DRAFT,
    FORMAT_NONE,
    FORMAT_SEALED_DECK,
} from "@/app/constants";
import styles from "@/app/page.module.scss";
import { ManaBoxCard } from "@/app/types";
import {
    getLocalCardData,
    getSetCodesWithCardCount,
    getRequiredBoosterCount,
    SetCodeWithCardCount,
} from "@/app/utils";

export default function Home() {
    const [cards, setCards] = useState<ManaBoxCard[] | null>(null);
    const [format, setFormat] = useState(FORMAT_NONE);
    const [playerCount, setPlayerCount] = useState(FORMAT_NONE.minPlayerCount);
    const [setCodesWithCardCount, setSetCodesWithCardCount] = useState<
        SetCodeWithCardCount[] | null
    >(null);

    const requiredBoosterCount = useMemo(
        () => getRequiredBoosterCount(format, playerCount),
        [format, playerCount]
    );

    const setCodesListItems = useMemo(
        () =>
            setCodesWithCardCount?.map(({ setCode, count }) => (
                <li key={setCode} className={styles.setCodeListItem}>
                    <input
                        id={setCode}
                        name={setCode}
                        type="checkbox"
                        value={setCode}
                    />
                    <label htmlFor={setCode}>
                        {setCode} ({count} cards)
                    </label>
                </li>
            )),
        [setCodesWithCardCount]
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const parsedData = await getLocalCardData();
                setCards(parsedData.data);
                const setCodes = getSetCodesWithCardCount(parsedData.data);
                setSetCodesWithCardCount(setCodes);
            } catch (error) {
                console.error("Error fetching or parsing the CSV data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1>MTG Booster Builder</h1>

            <h2>Step 1: Import your cards</h2>
            {/* TODO - make this an input so you can upload your .csv file */}
            <p>
                {cards
                    ? `✅ ${cards.length} cards found.`
                    : "⏱️ Loading cards..."}
            </p>

            <h2>Step 2: Choose your setup</h2>

            <h3 id="format-label">Format</h3>
            {/* TODO - show format details */}
            <select
                aria-labelledby="format-label"
                onChange={(event) =>
                    setFormat(
                        [FORMAT_BOOSTER_DRAFT, FORMAT_SEALED_DECK].find(
                            (format) => format.name === event.target.value
                        ) || FORMAT_NONE
                    )
                }
                value={format.name}
            >
                <option value={FORMAT_NONE.name}>No format</option>
                <option value={FORMAT_BOOSTER_DRAFT.name}>
                    {FORMAT_BOOSTER_DRAFT.name}
                </option>
                <option value={FORMAT_SEALED_DECK.name}>
                    {FORMAT_SEALED_DECK.name}
                </option>
            </select>

            <h3 id="player-count-label">
                Number of{" "}
                {format.name === FORMAT_NONE.name ? "boosters" : "players"}
            </h3>
            {/* TODO - make attributes match selected format */}
            <input
                aria-labelledby="player-count-label"
                className={styles.numberInput}
                max={format.maxPlayerCount || Number.MAX_SAFE_INTEGER}
                min={format.minPlayerCount}
                onChange={(event) => setPlayerCount(Number(event.target.value))}
                type="number"
                value={playerCount}
            />

            <p>
                {requiredBoosterCount} booster
                {requiredBoosterCount !== 1 && "s"} will be generated for you.
            </p>

            <h3>Set(s)</h3>

            {setCodesListItems?.length ? (
                <ul className={styles.setCodesSelection}>
                    {setCodesListItems}
                </ul>
            ) : (
                <p>Loading sets...</p>
            )}
        </div>
    );
}
