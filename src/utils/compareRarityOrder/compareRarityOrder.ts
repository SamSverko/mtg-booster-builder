import { MTG } from "@/constants";
import { ManaBox } from "@/types";

/**
 * Compare two card rarities based on their order.
 */
export const compareRarityOrder = (
    a: ManaBox.CardRarity,
    b: ManaBox.CardRarity
): number => {
    if (!(a in MTG.RARITY_ORDER) || !(b in MTG.RARITY_ORDER)) {
        throw new Error("Invalid rarity");
    }

    return MTG.RARITY_ORDER[a] - MTG.RARITY_ORDER[b];
};
