import { Card } from "@/types";

export type CardCondensed = {
    /**
     * binderType
     */
    b: Card["binderType"];
    /**
     * Collector Number
     */
    c: Card["collectorNumber"];
    /**
     * Foil
     */
    f: Card["foil"];
    /**
     * Name
     */
    n: Card["name"];
    /**
     * Rarity
     */
    r: Card["rarity"];
};

/**
 * Condense card data into the minimal format for storage.
 */
export const condenseCards = (cards: Card[]): CardCondensed[] => {
    if (cards.length === 0) {
        return [];
    }

    return cards.map((card) => ({
        b: card.binderType,
        c: card.collectorNumber,
        f: card.foil,
        n: card.name,
        r: card.rarity,
    }));
};
