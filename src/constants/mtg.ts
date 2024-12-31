import { ManaBox, MTG } from "@/types";

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
 * Special Guests (SPG) set (aka The List).
 *
 * Sourced from [Scryfall](https://scryfall.com/sets/spg).
 */
export const THE_LIST = {
    fdn: [74, 75, 76, 77, 78, 79, 80, 81, 82, 83].map((collectorNumber) => ({
        collectorNumber,
        setCode: "spg",
    })),
    dsk: [64, 65, 66, 67, 68, 69, 70, 71, 72, 73].map((collectorNumber) => ({
        collectorNumber,
        setCode: "spg",
    })),
    blb: [54, 55, 56, 57, 58, 59, 60, 61, 62, 63].map((collectorNumber) => ({
        collectorNumber,
        setCode: "spg",
    })),
    mh3: [39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53].map(
        (collectorNumber) => ({
            collectorNumber,
            setCode: "spg",
        })
    ),
    otj: [29, 30, 31, 32, 33, 34, 35, 36, 37, 38].map((collectorNumber) => ({
        collectorNumber,
        setCode: "spg",
    })),
    mkm: [19, 20, 21, 22, 23, 24, 25, 26, 27, 28].map((collectorNumber) => ({
        collectorNumber,
        setCode: "spg",
    })),
    lci: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map(
        (collectorNumber) => ({
            collectorNumber,
            setCode: "spg",
        })
    ),
};
