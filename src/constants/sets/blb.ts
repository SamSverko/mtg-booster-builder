import { THE_LIST } from "@/constants";
import { PlayBoosterRule } from "@/types";

/**
 *
 * Bloomburrow full-art basic lands.
 *
 * Sourced from [Scryfall](https://scryfall.com/sets/blb).
 */
export const FULL_ART_BASIC_LAND_CARDS_BLB = {
    spring: [262, 266, 270, 274, 278].map((collectorNumber) => ({
        collectorNumber,
        rarity: "common",
        setCode: "BLB",
    })),
    summer: [263, 267, 271, 275, 279].map((collectorNumber) => ({
        collectorNumber,
        rarity: "common",
        setCode: "BLB",
    })),
    autumn: [264, 268, 272, 276, 280].map((collectorNumber) => ({
        collectorNumber,
        rarity: "common",
        setCode: "BLB",
    })),
    winter: [265, 269, 273, 277, 281].map((collectorNumber) => ({
        collectorNumber,
        rarity: "common",
        setCode: "BLB",
    })),
};

/**
 * Bloomburrow nonbasic lands.
 *
 * Sourced from [Scryfall](https://scryfall.com/sets/blb).
 */
export const NONBASIC_LAND_CARDS_BLB = {
    common: [254, 261, 396, 397].map((collectorNumber) => ({
        collectorNumber,
        rarity: "common",
        setCode: "BLB",
    })),
    uncommon: [255, 256, 257, 258, 259].map((collectorNumber) => ({
        collectorNumber,
        rarity: "uncommon",
        setCode: "BLB",
    })),
    rare: [252, 253, 260, 337, 338, 339, 340, 367, 368].map(
        (collectorNumber) => ({
            collectorNumber,
            rarity: "rare",
            setCode: "BLB",
        })
    ),
};

/**
 * Bloomburrow Play Booster, excluding non-playable card slot.
 *
 * Slot info sourced from [Collecting Bloomburrow](https://magic.wizards.com/en/news/feature/collecting-bloomburrow).
 *
 * Wildcard slots percentages mirrors the generic Play Booster (since the source doesn't provide specifics).
 */
export const PLAY_BOOSTER_RULE_BLB: PlayBoosterRule = {
    slots: [
        // 1 - Common
        [
            {
                denyList: [
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.spring,
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.summer,
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.autumn,
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.winter,
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
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.spring,
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.summer,
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.autumn,
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.winter,
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
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.spring,
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.summer,
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.autumn,
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.winter,
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
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.spring,
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.summer,
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.autumn,
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.winter,
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
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.spring,
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.summer,
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.autumn,
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.winter,
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
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.spring,
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.summer,
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.autumn,
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.winter,
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
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.spring,
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.summer,
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.autumn,
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.winter,
                ],
                foil: "normal",
                percentage: 98.5,
                rarity: "common",
            },
            {
                allowList: THE_LIST.BLB,
                foil: "normal",
                percentage: 1.5,
                rarity: "mythic",
            },
        ],
        // 8 - Uncommon
        [
            {
                foil: "normal",
                percentage: 100,
                rarity: "uncommon",
            },
        ],
        // 9 - Uncommon
        [
            {
                foil: "normal",
                percentage: 100,
                rarity: "uncommon",
            },
        ],
        // 10 - Uncommon
        [
            {
                foil: "normal",
                percentage: 100,
                rarity: "uncommon",
            },
        ],
        // 11 - Wildcard of any rarity
        [
            {
                denyList: [
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.spring,
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.summer,
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.autumn,
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.winter,
                ],
                foil: "normal",
                percentage: 58.82,
                rarity: "common",
            },
            {
                foil: "normal",
                percentage: 35.29,
                rarity: "uncommon",
            },
            {
                foil: "normal",
                percentage: 5.15,
                rarity: "rare",
            },
            {
                foil: "normal",
                percentage: 0.74,
                rarity: "mythic",
            },
        ],
        // 12 - Rare or Mythic Rare
        [
            {
                foil: "normal",
                percentage: 85.71,
                rarity: "rare",
            },
            {
                foil: "normal",
                percentage: 14.29,
                rarity: "mythic",
            },
        ],
        // 13 - Traditional foil of any rarity
        [
            {
                denyList: [
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.spring,
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.summer,
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.autumn,
                    ...FULL_ART_BASIC_LAND_CARDS_BLB.winter,
                ],
                foil: "foil",
                percentage: 58.82,
                rarity: "common",
            },
            {
                foil: "foil",
                percentage: 35.29,
                rarity: "uncommon",
            },
            {
                foil: "foil",
                percentage: 5.15,
                rarity: "rare",
            },
            {
                foil: "foil",
                percentage: 0.74,
                rarity: "mythic",
            },
        ],
        // 14 - Seasonal full-art basic land
        [
            {
                allowList: FULL_ART_BASIC_LAND_CARDS_BLB.spring,
                foil: "normal",
                percentage: 32,
                rarity: "common",
            },
            {
                allowList: FULL_ART_BASIC_LAND_CARDS_BLB.spring,
                foil: "foil",
                percentage: 8,
                rarity: "common",
            },
            {
                allowList: FULL_ART_BASIC_LAND_CARDS_BLB.summer,
                foil: "normal",
                percentage: 24,
                rarity: "common",
            },
            {
                allowList: FULL_ART_BASIC_LAND_CARDS_BLB.summer,
                foil: "foil",
                percentage: 6,
                rarity: "common",
            },
            {
                allowList: FULL_ART_BASIC_LAND_CARDS_BLB.autumn,
                foil: "normal",
                percentage: 16,
                rarity: "common",
            },
            {
                allowList: FULL_ART_BASIC_LAND_CARDS_BLB.autumn,
                foil: "foil",
                percentage: 4,
                rarity: "common",
            },
            {
                allowList: FULL_ART_BASIC_LAND_CARDS_BLB.winter,
                foil: "normal",
                percentage: 8,
                rarity: "common",
            },
            {
                allowList: FULL_ART_BASIC_LAND_CARDS_BLB.winter,
                foil: "foil",
                percentage: 2,
                rarity: "common",
            },
        ],
    ],
};
