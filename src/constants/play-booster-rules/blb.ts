import { MTG } from "@/constants";
import { App } from "@/types";

export const FULL_ART_BASIC_LANDS_BLB = {
    spring: [262, 266, 270, 274, 278].map((collectorNumber) => ({
        collectorNumber,
        setCode: "blb",
    })),
    summer: [263, 267, 271, 275, 279].map((collectorNumber) => ({
        collectorNumber,
        setCode: "blb",
    })),
    autumn: [264, 268, 272, 276, 280].map((collectorNumber) => ({
        collectorNumber,
        setCode: "blb",
    })),
    winter: [265, 269, 273, 277, 281].map((collectorNumber) => ({
        collectorNumber,
        setCode: "blb",
    })),
};

export const NONBASIC_LANDS_BLB = {
    common: [254, 261, 396, 397].map((collectorNumber) => ({
        collectorNumber,
        setCode: "blb",
    })),
    uncommon: [255, 256, 257, 258, 259].map((collectorNumber) => ({
        collectorNumber,
        setCode: "blb",
    })),
    rare: [252, 253, 260, 337, 338, 339, 340, 367, 368].map(
        (collectorNumber) => ({
            collectorNumber,
            setCode: "blb",
        })
    ),
};

/**
 * Bloomburrow Play Booster, excluding non-playable card slot.
 *
 * Slot info sourced from [Collecting Bloomburrow](https://magic.wizards.com/en/news/feature/collecting-bloomburrow).
 */
export const PLAY_BOOSTER_RULE_BLB: App.PlayBoosterRule = {
    slots: [
        // 1 - Common
        [
            {
                denyList: [
                    ...NONBASIC_LANDS_BLB.uncommon,
                    ...NONBASIC_LANDS_BLB.rare,
                ],
                foil: "normal",
                percentage: 100,
                rarity: "common",
            },
        ],
        // 2 - Common
        [
            {
                denyList: [
                    ...NONBASIC_LANDS_BLB.uncommon,
                    ...NONBASIC_LANDS_BLB.rare,
                ],
                foil: "normal",
                percentage: 100,
                rarity: "common",
            },
        ],
        // 3 - Common
        [
            {
                denyList: [
                    ...NONBASIC_LANDS_BLB.uncommon,
                    ...NONBASIC_LANDS_BLB.rare,
                ],
                foil: "normal",
                percentage: 100,
                rarity: "common",
            },
        ],
        // 4 - Common
        [
            {
                denyList: [
                    ...NONBASIC_LANDS_BLB.uncommon,
                    ...NONBASIC_LANDS_BLB.rare,
                ],
                foil: "normal",
                percentage: 100,
                rarity: "common",
            },
        ],
        // 5 - Common
        [
            {
                denyList: [
                    ...NONBASIC_LANDS_BLB.uncommon,
                    ...NONBASIC_LANDS_BLB.rare,
                ],
                foil: "normal",
                percentage: 100,
                rarity: "common",
            },
        ],
        // 6 - Common
        [
            {
                denyList: [
                    ...NONBASIC_LANDS_BLB.uncommon,
                    ...NONBASIC_LANDS_BLB.rare,
                ],
                foil: "normal",
                percentage: 100,
                rarity: "common",
            },
        ],
        // 7 - Common or The List
        [
            {
                denyList: [
                    ...NONBASIC_LANDS_BLB.uncommon,
                    ...NONBASIC_LANDS_BLB.rare,
                ],
                foil: "normal",
                percentage: 98.5,
                rarity: "common",
            },
            {
                allowList: MTG.THE_LIST.blb,
                foil: "normal",
                percentage: 1.5,
                rarity: "mythic",
            },
        ],
        // 8 - Uncommon
        [
            {
                denyList: [
                    ...NONBASIC_LANDS_BLB.common,
                    ...NONBASIC_LANDS_BLB.rare,
                ],
                foil: "normal",
                percentage: 100,
                rarity: "uncommon",
            },
        ],
        // 9 - Uncommon
        [
            {
                denyList: [
                    ...NONBASIC_LANDS_BLB.common,
                    ...NONBASIC_LANDS_BLB.rare,
                ],
                foil: "normal",
                percentage: 100,
                rarity: "uncommon",
            },
        ],
        // 10 - Uncommon
        [
            {
                denyList: [
                    ...NONBASIC_LANDS_BLB.common,
                    ...NONBASIC_LANDS_BLB.rare,
                ],
                foil: "normal",
                percentage: 100,
                rarity: "uncommon",
            },
        ],
        // 11 - Wildcard of any rarity
        [
            {
                denyList: [
                    ...NONBASIC_LANDS_BLB.uncommon,
                    ...NONBASIC_LANDS_BLB.rare,
                ],
                foil: "normal",
                percentage: 58.82,
                rarity: "common",
            },
            {
                denyList: [
                    ...NONBASIC_LANDS_BLB.common,
                    ...NONBASIC_LANDS_BLB.rare,
                ],
                foil: "normal",
                percentage: 35.29,
                rarity: "uncommon",
            },
            {
                denyList: [
                    ...NONBASIC_LANDS_BLB.common,
                    ...NONBASIC_LANDS_BLB.uncommon,
                ],
                foil: "normal",
                percentage: 5.15,
                rarity: "rare",
            },
            {
                denyList: [
                    ...NONBASIC_LANDS_BLB.common,
                    ...NONBASIC_LANDS_BLB.uncommon,
                    ...NONBASIC_LANDS_BLB.rare,
                ],
                foil: "normal",
                percentage: 0.74,
                rarity: "mythic",
            },
        ],
        // 12 - Rare or Mythic Rare
        [
            {
                denyList: [
                    ...NONBASIC_LANDS_BLB.common,
                    ...NONBASIC_LANDS_BLB.uncommon,
                ],
                foil: "normal",
                percentage: 85.71,
                rarity: "rare",
            },
            {
                denyList: [
                    ...NONBASIC_LANDS_BLB.common,
                    ...NONBASIC_LANDS_BLB.uncommon,
                    ...NONBASIC_LANDS_BLB.rare,
                ],
                foil: "normal",
                percentage: 14.29,
                rarity: "mythic",
            },
        ],
        // 13 - Traditional foil of any rarity
        [
            {
                denyList: [
                    ...NONBASIC_LANDS_BLB.uncommon,
                    ...NONBASIC_LANDS_BLB.rare,
                ],
                foil: "foil",
                percentage: 58.82,
                rarity: "common",
            },
            {
                denyList: [
                    ...NONBASIC_LANDS_BLB.common,
                    ...NONBASIC_LANDS_BLB.rare,
                ],
                foil: "foil",
                percentage: 35.29,
                rarity: "uncommon",
            },
            {
                denyList: [
                    ...NONBASIC_LANDS_BLB.common,
                    ...NONBASIC_LANDS_BLB.uncommon,
                ],
                foil: "foil",
                percentage: 5.15,
                rarity: "rare",
            },
            {
                denyList: [
                    ...NONBASIC_LANDS_BLB.common,
                    ...NONBASIC_LANDS_BLB.uncommon,
                    ...NONBASIC_LANDS_BLB.rare,
                ],
                foil: "foil",
                percentage: 0.74,
                rarity: "mythic",
            },
        ],
        // 14 - Seasonal full-art basic land
        [
            {
                allowList: FULL_ART_BASIC_LANDS_BLB.spring,
                foil: "normal",
                percentage: 32,
                rarity: "common",
            },
            {
                allowList: FULL_ART_BASIC_LANDS_BLB.spring,
                foil: "foil",
                percentage: 8,
                rarity: "common",
            },
            {
                allowList: FULL_ART_BASIC_LANDS_BLB.summer,
                foil: "normal",
                percentage: 24,
                rarity: "common",
            },
            {
                allowList: FULL_ART_BASIC_LANDS_BLB.summer,
                foil: "foil",
                percentage: 6,
                rarity: "common",
            },
            {
                allowList: FULL_ART_BASIC_LANDS_BLB.autumn,
                foil: "normal",
                percentage: 16,
                rarity: "common",
            },
            {
                allowList: FULL_ART_BASIC_LANDS_BLB.autumn,
                foil: "foil",
                percentage: 4,
                rarity: "common",
            },
            {
                allowList: FULL_ART_BASIC_LANDS_BLB.winter,
                foil: "normal",
                percentage: 8,
                rarity: "common",
            },
            {
                allowList: FULL_ART_BASIC_LANDS_BLB.winter,
                foil: "foil",
                percentage: 2,
                rarity: "common",
            },
        ],
    ],
};
