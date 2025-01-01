import { type Card, type PlayBooster } from "@/types";
import { condenseCards, type CardCondensed } from "@/utils";

export type BoosterCondensed = {
    /**
     * Set Code
     */
    s: Card["setCode"];
    /**
     * Cards
     */
    c: CardCondensed[];
};

/**
 * Condense booster data into the minimal format for storage.
 */
export const condenseBoosters = (
    boosters: PlayBooster[]
): BoosterCondensed[] => {
    if (boosters.length === 0) {
        return [];
    }

    return boosters.map((booster) => ({
        s: booster.setCode,
        c: condenseCards(booster.cards),
    }));
};
