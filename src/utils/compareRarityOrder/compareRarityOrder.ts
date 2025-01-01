import { RARITY_ORDER } from "@/constants";
import { ManaBox } from "@/types";

/**
 * Compare two card rarities based on their order.
 */
export const compareRarityOrder = (
    a: ManaBox.CardRarity,
    b: ManaBox.CardRarity
): number => {
    if (!(a in RARITY_ORDER) || !(b in RARITY_ORDER)) {
        throw new Error("Invalid rarity");
    }

    return RARITY_ORDER[a] - RARITY_ORDER[b];
};
