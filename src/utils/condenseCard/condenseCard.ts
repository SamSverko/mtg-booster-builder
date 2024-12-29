import { App, ManaBox } from "@/types";

/**
 * Condense card data into the minimal format for storage.
 */
export const condenseCard = (
    card: ManaBox.Card
): App.PlayBoosterCardCondensed => {
    return {
        b: card.binderType,
        c: card.collectorNumber,
        f: card.foil,
        n: card.name,
        r: card.rarity,
    };
};
