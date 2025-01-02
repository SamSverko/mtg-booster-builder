import { PlayBoosterRule } from "@/types";

/**
 * Generic Play Booster, excluding non-playable card slot.
 *
 * Slot info sourced from [What are Play Boosters?](https://magic.wizards.com/en/news/making-magic/what-are-play-boosters).
 *
 * Wildcard slots info sourced from [Reward Distribution | Magic: The Gathering Arena](https://magic.wizards.com/en/mtgarena/drop-rates).
 */
export const PLAY_BOOSTER_RULE: PlayBoosterRule = {
    slots: [
        // 1 - Common
        [{ foil: "normal", percentage: 100, rarity: "common" }],
        // 2 - Common
        [{ foil: "normal", percentage: 100, rarity: "common" }],
        // 3 - Common
        [{ foil: "normal", percentage: 100, rarity: "common" }],
        // 4 - Common
        [{ foil: "normal", percentage: 100, rarity: "common" }],
        // 5 - Common
        [{ foil: "normal", percentage: 100, rarity: "common" }],
        // 6 - Common
        [{ foil: "normal", percentage: 100, rarity: "common" }],
        // 7 - Common/The List (ignoring 'The List' for now, but keeping rarity percentages)
        [
            { foil: "normal", percentage: 87.5, rarity: "common" },
            { foil: "normal", percentage: 9.38, rarity: "uncommon" },
            { foil: "normal", percentage: 1.56, rarity: "rare" },
            { foil: "normal", percentage: 1.56, rarity: "mythic" },
        ],
        // 8 - Uncommon
        [{ foil: "normal", percentage: 100, rarity: "uncommon" }],
        // 9 - Uncommon
        [{ foil: "normal", percentage: 100, rarity: "uncommon" }],
        // 10 - Uncommon
        [{ foil: "normal", percentage: 100, rarity: "uncommon" }],
        // 11 - Rare/Mythic Rare
        [
            { foil: "normal", percentage: 85.71, rarity: "rare" },
            { foil: "normal", percentage: 14.29, rarity: "mythic" },
        ],
        // 12 - Basic Land
        [
            {
                foil: "normal",
                percentage: 80,
                rarity: "common",
                superType: "basic",
                type: "land",
            },
            {
                foil: "foil",
                percentage: 20,
                rarity: "common",
                superType: "basic",
                type: "land",
            },
        ],
        // 13 - Non-Foil Wildcard Slot
        [
            { foil: "normal", percentage: 58.82, rarity: "common" },
            { foil: "normal", percentage: 35.29, rarity: "uncommon" },
            { foil: "normal", percentage: 5.15, rarity: "rare" },
            { foil: "normal", percentage: 0.74, rarity: "mythic" },
        ],
        // 14 - Traditional-Foil Wildcard Slot
        [
            { foil: "foil", percentage: 58.82, rarity: "common" },
            { foil: "foil", percentage: 35.29, rarity: "uncommon" },
            { foil: "foil", percentage: 5.15, rarity: "rare" },
            { foil: "foil", percentage: 0.74, rarity: "mythic" },
        ],
    ],
};
