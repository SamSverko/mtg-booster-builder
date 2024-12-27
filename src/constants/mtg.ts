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
export const PLAY_BOOSTER: App.PlayBooster = {
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
        // TODO - I think nonbasic lands can also appear here?
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
