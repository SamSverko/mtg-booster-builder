import Papa from "papaparse";

import { Format, ManaBoxCard } from "@/app/types";
import { PLAY_BOOSTER } from "@/app/constants";

export const getLocalCardData = async () => {
    const response = await fetch("/cards.csv");
    if (!response.ok) {
        throw new Error("Failed to load the CSV file.");
    }

    const csvFile = await response.text();

    return Papa.parse<ManaBoxCard>(csvFile, {
        dynamicTyping: true,
        header: true,
        skipEmptyLines: true,
        transformHeader(header) {
            return header
                .split(" ")
                .map((word, index) =>
                    index === 0
                        ? word.charAt(0).toLowerCase() + word.slice(1)
                        : word.charAt(0).toUpperCase() + word.slice(1)
                )
                .join("");
        },
    });
};

export type SetCodeWithCardCount = {
    count: number;
    setCode: string;
};

export const getSetCodesWithCardCount = (
    manaBoxCards: ManaBoxCard[]
): SetCodeWithCardCount[] => {
    return Object.entries(
        manaBoxCards.reduce((acc: { [key: string]: number }, card) => {
            if (!acc[card.setCode]) {
                acc[card.setCode] = 0;
            }

            acc[card.setCode]++;

            return acc;
        }, {})
    )
        .sort(([, countA], [, countB]) => countB - countA)
        .map(([setCode, count]) => ({ setCode, count }));
};

export const getBoosterRequirements = (format: Format, playerCount: number) => {
    const boosterCount = !format.boosterPerPlayerCount
        ? playerCount
        : Math.ceil(playerCount * format.boosterPerPlayerCount);

    const cardCountPerSet = boosterCount * PLAY_BOOSTER.slots.length;

    return { boosterCount, cardCountPerSet };
};
