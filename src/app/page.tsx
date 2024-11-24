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
    getBoosterRequirements,
    SetCodeWithCardCount,
} from "@/app/utils";

export default function Home() {
    console.clear();
    const [cards, setCards] = useState<ManaBoxCard[] | null>(null);
    const [format, setFormat] = useState(FORMAT_NONE);
    const [playerCount, setPlayerCount] = useState(FORMAT_NONE.minPlayerCount);
    const [selectedSets, setSelectedSets] = useState<SetCodeWithCardCount[]>(
        []
    );
    const [setCodesWithCardCount, setSetCodesWithCardCount] = useState<
        SetCodeWithCardCount[] | null
    >(null);

    const boosterRequirements = useMemo(
        () => getBoosterRequirements(format, playerCount),
        [format, playerCount]
    );

    const setCodesListItems = useMemo(
        () =>
            setCodesWithCardCount?.map((set) => {
                const isDisabled =
                    (!selectedSets.some((s) => s.setCode === set.setCode) &&
                        selectedSets.length >=
                            boosterRequirements.boosterCount) ||
                    set.count < boosterRequirements.cardCountPerSet;

                return (
                    <li key={set.setCode} className={styles.setCodeListItem}>
                        <input
                            disabled={isDisabled}
                            id={set.setCode}
                            name={set.setCode}
                            type="checkbox"
                            value={set.setCode}
                            checked={selectedSets.some(
                                (s) => s.setCode === set.setCode
                            )}
                            onChange={(event) =>
                                handleSetSelection(set, event.target.checked)
                            }
                        />
                        <label htmlFor={set.setCode}>
                            {set.setCode} ({set.count} cards)
                        </label>
                    </li>
                );
            }),
        [
            boosterRequirements.boosterCount,
            boosterRequirements.cardCountPerSet,
            setCodesWithCardCount,
            selectedSets,
        ]
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

    const handleSetSelection = (
        set: SetCodeWithCardCount,
        isChecked: boolean
    ) => {
        setSelectedSets((prevSelected) => {
            if (isChecked) {
                return [...prevSelected, set];
            } else {
                return prevSelected.filter((s) => s.setCode !== set.setCode);
            }
        });
    };

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

            <h3>Set(s)</h3>

            <p>
                <b>Note:</b> Disabled sets do not have enough cards for your
                settings.
            </p>

            {setCodesListItems?.length ? (
                <ul className={styles.setCodesSelection}>
                    {setCodesListItems}
                </ul>
            ) : (
                <p>Loading sets...</p>
            )}

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
                <li>
                    <b>Number of boosters to be generated per set:</b>
                    <ul>
                        {selectedSets.length === 0 && <li>⚠️ None selected</li>}
                        {selectedSets.map((set) => (
                            <li key={set.setCode}>
                                {set.setCode}:{" "}
                                {boosterRequirements.boosterCount} booster
                                {boosterRequirements.boosterCount !== 1 && "s"}
                            </li>
                        ))}
                    </ul>
                </li>
            </ul>
        </div>
    );
}
