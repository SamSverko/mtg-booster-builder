import { ManaBox } from "@/types";

export type CardCondensed = {
    /**
     * binderType
     */
    b: ManaBox.Card["binderType"];
    /**
     * Collector Number
     */
    c: ManaBox.Card["collectorNumber"];
    /**
     * Foil
     */
    f: ManaBox.Card["foil"];
    /**
     * Name
     */
    n: ManaBox.Card["name"];
    /**
     * Rarity
     */
    r: ManaBox.Card["rarity"];
};

/**
 * Condense card data into the minimal format for storage.
 */
export const condenseCards = (cards: ManaBox.Card[]): CardCondensed[] => {
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
