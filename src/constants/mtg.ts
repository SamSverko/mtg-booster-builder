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
