import { App, ManaBox } from "@/types";
import { condenseCard, type CardCondensed } from "@/utils";

type BoosterCondensed = {
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
 * Condense card data into the minimal format for storage.
 */
export const condenseBooster = (booster: App.PlayBooster): BoosterCondensed => {
    return {
        s: booster.setCode,
        c: booster.cards.map((card) => {
            return condenseCard(card);
        }),
    };
};
