import { THE_LIST } from "@/constants";
import { type PlayBoosterRule } from "@/types";

/**
 * Duskmourn Lurking Evil cards.
 *
 * Sourced from [Scryfall](https://scryfall.com/sets/dsk#lurking-evil-art-variants).
 */
export const LURKING_EVIL_CARDS_DSK = {
    common: [287, 295].map((collectorNumber) => ({
        collectorNumber,
        rarity: "common",
        setCode: "DSK",
    })),
    uncommon: [288, 291, 297, 300].map((collectorNumber) => ({
        collectorNumber,
        rarity: "uncommon",
        setCode: "DSK",
    })),
    rare: [289, 290, 292, 294, 296, 299, 301].map((collectorNumber) => ({
        collectorNumber,
        rarity: "rare",
        setCode: "DSK",
    })),
    mythic: [293, 298].map((collectorNumber) => ({
        collectorNumber,
        rarity: "mythic",
        setCode: "DSK",
    })),
};

/**
 * Duskmourn Showcase cards (aka Paranormal Frame Version).
 *
 * Sourced from [Scryfall](https://scryfall.com/sets/dsk#showcases).
 */
export const SHOWCASE_CARDS_DSK = {
    uncommon: [306, 313, 321, 323].map((collectorNumber) => ({
        collectorNumber,
        rarity: "uncommon",
        setCode: "DSK",
    })),
    rare: [
        302, 303, 304, 305, 307, 308, 309, 310, 312, 314, 315, 316, 318, 319,
        320, 322, 324, 325, 326, 327,
    ].map((collectorNumber) => ({
        collectorNumber,
        rarity: "rare",
        setCode: "DSK",
    })),
    mythic: [311, 317].map((collectorNumber) => ({
        collectorNumber,
        rarity: "mythic",
        setCode: "DSK",
    })),
};

/**
 * Duskmourn Borderless cards.
 *
 * Sourced from [Scryfall](https://scryfall.com/sets/dsk#borderless-cards).
 */
export const BORDERLESS_CARDS_DSK = {
    rare: [
        329, 330, 331, 332, 333, 334, 336, 339, 342, 343, 345, 346, 347, 350,
    ].map((collectorNumber) => ({
        collectorNumber,
        rarity: "rare",
        setCode: "DSK",
    })),
    mythic: [328, 335, 337, 338, 340, 341, 344, 348, 349].map(
        (collectorNumber) => ({
            collectorNumber,
            rarity: "mythic",
            setCode: "DSK",
        })
    ),
};

/**
 * Duskmourn Double Exposure cards.
 *
 * Sourced from [Scryfall](https://scryfall.com/sets/dsk#double-exposure-cards).
 */
export const DOUBLE_EXPOSURE_CARDS_DSK = {
    rare: [356, 357, 358, 359, 360, 361, 362, 363, 364, 365, 366, 367].map(
        (collectorNumber) => ({
            collectorNumber,
            rarity: "rare",
            setCode: "DSK",
        })
    ),
    mythic: [351, 352, 353, 354, 355].map((collectorNumber) => ({
        collectorNumber,
        rarity: "mythic",
        setCode: "DSK",
    })),
};

/**
 * Duskmourn Extended Art cards.
 *
 * Sourced from [Scryfall](https://scryfall.com/sets/dsk#extended-art).
 */
export const EXTENDED_ART_CARDS_DSK = {
    rare: [368, 369, 371, 372, 374, 375, 376, 378, 379, 381, 382, 384, 385].map(
        (collectorNumber) => ({
            collectorNumber,
            rarity: "rare",
            setCode: "DSK",
        })
    ),
    mythic: [370, 373, 377, 380, 383].map((collectorNumber) => ({
        collectorNumber,
        rarity: "mythic",
        setCode: "DSK",
    })),
};

/**
 * Duskmourn Full Art Basic Land cards.
 *
 * Sourced from [Scryfall](https://scryfall.com/sets/dsk).
 */
export const FULL_ART_BASIC_LAND_CARDS_DSK = {
    common: [272, 273, 274, 275, 276].map((collectorNumber) => ({
        collectorNumber,
        rarity: "common",
        setCode: "DSK",
    })),
};

/**
 * Duskmourn Dual Land cards.
 *
 * Sourced from [Scryfall](https://scryfall.com/sets/dsk).
 */
export const DUAL_LAND_CARDS_DSK = {
    common: [255, 257, 258, 262, 263, 264, 265, 266, 267, 268].map(
        (collectorNumber) => ({
            collectorNumber,
            rarity: "common",
            setCode: "DSK",
        })
    ),
};

/**
 * Duskmourn Play Booster, excluding non-playable card slot.
 *
 * Slot info sourced from [Collecting Duskmourn](https://magic.wizards.com/en/news/feature/collecting-duskmourn).
 *
 * Wildcard slots percentages mirrors the generic Play Booster (since the source doesn't provide specifics).
 */
export const PLAY_BOOSTER_RULE_DSK: PlayBoosterRule = {
    slots: [
        // 1 - Common
        [
            {
                denyList: [...LURKING_EVIL_CARDS_DSK.common],
                foil: "normal",
                percentage: 98.8 + 0.9, // Common + Lurking Evil (3/4)
                rarity: "common",
            },
            {
                allowList: [...LURKING_EVIL_CARDS_DSK.common],
                foil: "normal",
                percentage: 0.3, // Lurking Evil (1/4)
                rarity: "common",
            },
        ],
        // 2 - Common
        [
            {
                denyList: [...LURKING_EVIL_CARDS_DSK.common],
                foil: "normal",
                percentage: 98.8 + 0.9, // Common + Lurking Evil (3/4)
                rarity: "common",
            },
            {
                allowList: [...LURKING_EVIL_CARDS_DSK.common],
                foil: "normal",
                percentage: 0.3, // Lurking Evil (1/4)
                rarity: "common",
            },
        ],
        // 3 - Common
        [
            {
                denyList: [...LURKING_EVIL_CARDS_DSK.common],
                foil: "normal",
                percentage: 98.8 + 0.9, // Common + Lurking Evil (3/4)
                rarity: "common",
            },
            {
                allowList: [...LURKING_EVIL_CARDS_DSK.common],
                foil: "normal",
                percentage: 0.3, // Lurking Evil (1/4)
                rarity: "common",
            },
        ],
        // 4 - Common
        [
            {
                denyList: [...LURKING_EVIL_CARDS_DSK.common],
                foil: "normal",
                percentage: 98.8 + 0.9, // Common + Lurking Evil (3/4)
                rarity: "common",
            },
            {
                allowList: [...LURKING_EVIL_CARDS_DSK.common],
                foil: "normal",
                percentage: 0.3, // Lurking Evil (1/4)
                rarity: "common",
            },
        ],
        // 5 - Common
        [
            {
                denyList: [...LURKING_EVIL_CARDS_DSK.common],
                foil: "normal",
                percentage: 98.8 + 0.9, // Common + Lurking Evil (3/4)
                rarity: "common",
            },
            {
                allowList: [...LURKING_EVIL_CARDS_DSK.common],
                foil: "normal",
                percentage: 0.3, // Lurking Evil (1/4)
                rarity: "common",
            },
        ],
        // 6 - Common
        [
            {
                denyList: [...LURKING_EVIL_CARDS_DSK.common],
                foil: "normal",
                percentage: 98.8 + 0.9, // Common + Lurking Evil (3/4)
                rarity: "common",
            },
            {
                allowList: [...LURKING_EVIL_CARDS_DSK.common],
                foil: "normal",
                percentage: 0.3, // Lurking Evil (1/4)
                rarity: "common",
            },
        ],
        // 7 - Common or Special Guest
        [
            {
                denyList: [...LURKING_EVIL_CARDS_DSK.common],
                foil: "normal",
                percentage: 97.3 + 0.9, // Common + Lurking Evil (3/4)
                rarity: "common",
            },
            {
                allowList: [...LURKING_EVIL_CARDS_DSK.common],
                foil: "normal",
                percentage: 0.3, // Lurking Evil (1/4)
                rarity: "common",
            },
            {
                allowList: THE_LIST.DSK,
                foil: "normal",
                percentage: 1.5,
                rarity: "mythic",
            },
        ],
        // 8 - Uncommon
        [
            {
                denyList: [
                    ...LURKING_EVIL_CARDS_DSK.uncommon,
                    ...SHOWCASE_CARDS_DSK.uncommon,
                ],
                foil: "normal",
                percentage: 92 + 3 + 3, // Uncommon + Lurking Evil (3/4) + Showcase (3/4)
                rarity: "uncommon",
            },
            {
                allowList: [...LURKING_EVIL_CARDS_DSK.uncommon],
                foil: "normal",
                percentage: 1, // Lurking Evil (1/4)
                rarity: "uncommon",
            },
            {
                allowList: [...SHOWCASE_CARDS_DSK.uncommon],
                foil: "normal",
                percentage: 1, // Showcase (1/4)
                rarity: "uncommon",
            },
        ],
        // 9 - Uncommon
        [
            {
                denyList: [
                    ...LURKING_EVIL_CARDS_DSK.uncommon,
                    ...SHOWCASE_CARDS_DSK.uncommon,
                ],
                foil: "normal",
                percentage: 92 + 3 + 3, // Uncommon + Lurking Evil (3/4) + Showcase (3/4)
                rarity: "uncommon",
            },
            {
                allowList: [...LURKING_EVIL_CARDS_DSK.uncommon],
                foil: "normal",
                percentage: 1, // Lurking Evil (1/4)
                rarity: "uncommon",
            },
            {
                allowList: [...SHOWCASE_CARDS_DSK.uncommon],
                foil: "normal",
                percentage: 1, // Showcase (1/4)
                rarity: "uncommon",
            },
        ],
        // 10 - Uncommon
        [
            {
                denyList: [
                    ...LURKING_EVIL_CARDS_DSK.uncommon,
                    ...SHOWCASE_CARDS_DSK.uncommon,
                ],
                foil: "normal",
                percentage: 92 + 3 + 3, // Uncommon + Lurking Evil (3/4) + Showcase (3/4)
                rarity: "uncommon",
            },
            {
                allowList: [...LURKING_EVIL_CARDS_DSK.uncommon],
                foil: "normal",
                percentage: 1, // Lurking Evil (1/4)
                rarity: "uncommon",
            },
            {
                allowList: [...SHOWCASE_CARDS_DSK.uncommon],
                foil: "normal",
                percentage: 1, // Showcase (1/4)
                rarity: "uncommon",
            },
        ],
        // 11 - Rare, Mythic, or Booster Fun
        [
            {
                foil: "normal",
                percentage: 75,
                rarity: "rare",
            },
            {
                foil: "normal",
                percentage: 12.6,
                rarity: "mythic",
            },
            {
                allowList: [
                    ...SHOWCASE_CARDS_DSK.rare,
                    ...BORDERLESS_CARDS_DSK.rare,
                    ...DOUBLE_EXPOSURE_CARDS_DSK.rare,
                    ...EXTENDED_ART_CARDS_DSK.rare,
                ],
                foil: "normal",
                percentage: 8.2,
                rarity: "rare",
            },
            {
                allowList: [
                    ...SHOWCASE_CARDS_DSK.mythic,
                    ...BORDERLESS_CARDS_DSK.mythic,
                    ...DOUBLE_EXPOSURE_CARDS_DSK.mythic,
                    ...EXTENDED_ART_CARDS_DSK.mythic,
                ],
                foil: "normal",
                percentage: 1.4,
                rarity: "mythic",
            },
            {
                allowList: [...LURKING_EVIL_CARDS_DSK.rare],
                foil: "normal",
                percentage: 2.5,
                rarity: "rare",
            },
            {
                allowList: [...LURKING_EVIL_CARDS_DSK.mythic],
                foil: "normal",
                percentage: 0.3,
                rarity: "mythic",
            },
        ],
        // 12 - Wildcard of any rarity
        [
            {
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
        // 13 - Traditional foil card of any rarity
        [
            {
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
        // 14 - Land
        [
            {
                allowList: [...FULL_ART_BASIC_LAND_CARDS_DSK.common],
                foil: "normal",
                percentage: 13.3,
                rarity: "common",
            },
            {
                allowList: [...FULL_ART_BASIC_LAND_CARDS_DSK.common],
                foil: "foil",
                percentage: 3.3,
                rarity: "common",
            },
            {
                foil: "normal",
                percentage: 26.7,
                rarity: "common",
                superType: "basic",
                type: "land",
            },
            {
                foil: "foil",
                percentage: 6.7,
                rarity: "common",
                superType: "basic",
                type: "land",
            },
            {
                allowList: [...DUAL_LAND_CARDS_DSK.common],
                foil: "normal",
                percentage: 40,
                rarity: "common",
            },
            {
                allowList: [...DUAL_LAND_CARDS_DSK.common],
                foil: "foil",
                percentage: 10,
                rarity: "common",
            },
        ],
    ],
};
