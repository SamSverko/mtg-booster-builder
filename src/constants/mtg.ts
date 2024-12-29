import { App, ManaBox, MTG } from "@/types";

/**
 * Sourced from [MTG Wiki - Basic land](https://mtg.fandom.com/wiki/Basic_land)
 */
export const BASIC_LAND_NAMES = [
    "Plains",
    "Island",
    "Swamp",
    "Mountain",
    "Forest",
];

/**
 * Sourced from [MTG Wiki - Rarity](https://mtg.fandom.com/wiki/Rarity)
 */
export const RARITY_COLOR = {
    common: "#262626",
    uncommon: "#b9dceb",
    rare: "#e6cd8c",
    mythic: "#f59105",
};

/**
 * Sourced from [MTG Wiki - Rarity](https://mtg.fandom.com/wiki/Rarity)
 */
export const RARITY_ORDER: Record<ManaBox.CardRarity, number> = {
    common: 0,
    uncommon: 1,
    rare: 2,
    mythic: 3,
};

/**
 * Formats
 */
export const FORMAT_BOOSTER_DRAFT: MTG.Format = {
    boosterPerPlayerCount: 3,
    deckSize: 40,
    details:
        "Each player opens a booster pack, selects a card, and passes the remaining cards to the next player. Repeat until all cards are drafted.",
    duration: 120,
    maxPlayerCount: 8,
    minPlayerCount: 2,
    name: "Booster Draft",
    url: "https://magic.wizards.com/en/formats/booster-draft",
};

export const FORMAT_SEALED_DECK: MTG.Format = {
    boosterPerPlayerCount: 6,
    deckSize: 40,
    details:
        "Each player opens six booster packs and constructs a deck from the cards.",
    duration: 20,
    maxPlayerCount: 8,
    minPlayerCount: 2,
    name: "Sealed Deck",
    url: "https://magic.wizards.com/en/formats/sealed-deck",
};

export const FORMAT_NONE: MTG.Format = {
    minPlayerCount: 1,
    name: "No Format",
};

/**
 * Play Boosters
 */

/**
 * Generic Play Booster, excluding non-playable card slot.
 *
 * Slot info sourced from [What are Play Boosters?](https://magic.wizards.com/en/news/making-magic/what-are-play-boosters).
 *
 * Wildcard slots info sourced from [Reward Distribution | Magic: The Gathering Arena](https://magic.wizards.com/en/mtgarena/drop-rates).
 */
export const PLAY_BOOSTER: App.PlayBoosterRule = {
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
            { foil: "normal", percentage: 4.69, rarity: "uncommon" },
            { foil: "normal", percentage: 4.69, rarity: "uncommon" },
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
        // TODO - How to handle nonbasic lands when I don't have access to the type?
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

/**
 * Special Guests (SPG) set.
 *
 * Sourced from [Scryfall](https://scryfall.com/sets/spg).
 */
export const THE_LIST = {
    blb: [54, 55, 56, 57, 58, 59, 60, 61, 62, 63].map((collectorNumber) => ({
        collectorNumber,
        setCode: "spg",
    })),
};

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
export const PLAY_BOOSTER_BLB: App.PlayBoosterRule = {
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
                allowList: THE_LIST.blb,
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
