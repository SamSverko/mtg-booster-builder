import { App, ManaBox } from "@/types";
import { condenseCard, type CardCondensed } from "@/utils";

export type BoosterCondensed = {
    /**
     * Set Code
     */
    s: ManaBox.Card["setCode"];
    /**
     * Cards
     */
    c: CardCondensed[];
};

/**
 * Condense booster data into the minimal format for storage.
 */
export const condenseBoosters = (
    boosters: App.PlayBooster[]
): BoosterCondensed[] => {
    if (boosters.length === 0) {
        return [];
    }

    return boosters.map((booster) => ({
        s: booster.setCode,
        c: booster.cards.map((card) => condenseCard(card)),
    }));
};
