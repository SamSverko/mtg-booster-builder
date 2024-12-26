import LZString from "lz-string";

import { MTG } from "@/constants";
import { App, ManaBox } from "@/types";

/**
 * Compare two card rarities based on their order.
 */
export const compareRarityOrder = (
    a: ManaBox.CardRarity,
    b: ManaBox.CardRarity
): number => {
    return MTG.RARITY_ORDER[a] - MTG.RARITY_ORDER[b];
};

/**
 * Get the total card count.
 */
export function getCardCount(cards: ManaBox.Card[]): number {
    return cards.reduce((acc, card) => acc + card.quantity, 0);
}

/**
 * Get the total card count by set.
 */
export function getCardCountBySet(cards: ManaBox.Card[]): App.CardCountBySet {
    return Object.fromEntries(
        Object.entries(
            cards.reduce((acc: App.CardCountBySet, card) => {
                acc[card.setCode] = (acc[card.setCode] || 0) + card.quantity;
                return acc;
            }, {})
        ).sort(([, countA], [, countB]) => countB - countA)
    );
}

/**
 * Get the total card count by location (i.e. binderType).
 */
export function getCardCountByLocation(
    cards: ManaBox.Card[]
): App.CardCountByLocation {
    return Object.fromEntries(
        Object.entries(
            cards.reduce((acc: App.CardCountByLocation, card) => {
                acc[card.binderType] =
                    (acc[card.binderType] || 0) + card.quantity;
                return acc;
            }, {})
        ).sort(([, countA], [, countB]) => countB - countA)
    );
}

/**
 * Generate a URL with serialized boosters based on the provided cards and allocated booster counts.
 */
export function getSerializedBoostersUrl(
    cards: ManaBox.Card[] | undefined,
    allocatedBoosterCountBySet: App.AllocatedBoosterCountBySet
) {
    if (!cards || cards.length === 0) {
        console.warn("No cards available to generate boosters.");
        return undefined;
    }

    const generatedBoosters: ManaBox.Card[][] = [];

    Object.entries(allocatedBoosterCountBySet).forEach(
        ([setCode, allocatedBoosterCount]) => {
            if (allocatedBoosterCount <= 0) {
                console.warn(
                    `Skipping ${setCode} as allocated boosters count is 0 or less.`
                );
                return;
            }

            const setCards = cards.filter((card) => card.setCode === setCode);

            if (setCards.length === 0) {
                console.warn(`No cards found for set code: ${setCode}`);
                return;
            }

            // Create a map to track available cards with their quantities
            const availableCards = new Map<string, ManaBox.Card[]>();

            setCards.forEach((card) => {
                if (!availableCards.has(card.scryfallID)) {
                    availableCards.set(card.scryfallID, []);
                }

                // Push card copies into the map based on quantity
                for (let i = 0; i < card.quantity; i++) {
                    availableCards.get(card.scryfallID)?.push(card);
                }
            });

            for (let i = 0; i < allocatedBoosterCount; i++) {
                const usedScryfallIDs = new Set<string>();
                const booster: ManaBox.Card[] = [];

                MTG.PLAY_BOOSTER.slots.forEach((slot) => {
                    const selectedSlot = getRandomSlotItem(slot);

                    // Filter matching cards
                    let matchingCards = filterMatchingCards(
                        availableCards,
                        selectedSlot
                    );

                    if (
                        slot[0].superType === "basic" &&
                        slot[0].type === "land"
                    ) {
                        matchingCards = matchingCards.filter((card) =>
                            MTG.BASIC_LAND_NAMES.includes(card.name)
                        );
                    } else {
                        matchingCards = matchingCards.filter(
                            (card) => !MTG.BASIC_LAND_NAMES.includes(card.name)
                        );
                    }

                    matchingCards.sort(() => Math.random() - 0.5);

                    if (matchingCards.length > 0) {
                        const selectedCard = matchingCards.find(
                            (card) => !usedScryfallIDs.has(card.scryfallID)
                        );

                        if (selectedCard) {
                            usedScryfallIDs.add(selectedCard.scryfallID);
                            removeCardFromAvailableCards(
                                availableCards,
                                selectedCard
                            );
                            booster.push(selectedCard);
                        } else {
                            console.warn(
                                `Could not find a unique card for rarity ${selectedSlot.rarity} and foil ${selectedSlot.foil} in set ${setCode}`
                            );
                        }
                    } else {
                        console.warn(
                            `No cards available for ${slot[0].superType} ${slot[0].type} in set ${setCode}`
                        );
                    }
                });

                if (booster.length === 14) {
                    generatedBoosters.push(booster);
                } else {
                    console.warn(
                        `Booster ${i + 1} failed to generate for set ${setCode}`
                    );
                }
            }
        }
    );

    return `/boosters/?serializedBoosters=${serializeBoosters(
        generatedBoosters
    )}`;
}

/**
 * Get a random item from a slot based on its percentage distribution.
 */
function getRandomSlotItem(slot: App.PlayBoosterSlotItem) {
    // Get a random item based on its percentage distribution
    const totalPercentage = slot.reduce(
        (total, item) => total + item.percentage,
        0
    );
    const random = Math.random() * totalPercentage;

    let cumulativePercentage = 0;

    for (const item of slot) {
        cumulativePercentage += item.percentage;
        if (random <= cumulativePercentage) {
            return item;
        }
    }

    return slot[slot.length - 1]; // Return the last item if no match
}

/**
 * Filter cards based on the selected slot item.
 */
function filterMatchingCards(
    availableCards: Map<string, ManaBox.Card[]>,
    selectedSlot: App.PlayBoosterSlotItem[0]
) {
    // Filter cards by rarity and foil, and also account for quantity
    const matchingCards: ManaBox.Card[] = [];

    availableCards.forEach((cards) => {
        cards.forEach((card) => {
            if (
                card.rarity === selectedSlot.rarity &&
                card.foil === selectedSlot.foil
            ) {
                // Add the card to matchingCards based on its quantity
                for (let i = 0; i < card.quantity; i++) {
                    matchingCards.push(card);
                }
            }
        });
    });

    return matchingCards;
}

/**
 * Remove the selected card from the available cards map.
 */
function removeCardFromAvailableCards(
    availableCards: Map<string, ManaBox.Card[]>,
    selectedCard: ManaBox.Card
) {
    const cardList = availableCards.get(selectedCard.scryfallID);
    if (cardList) {
        // Find the index of the selected card
        const index = cardList.findIndex((card) => card === selectedCard);

        if (index !== -1) {
            // Remove the selected card from the list
            cardList.splice(index, 1);

            // If there are still copies of this card left, no need to delete it from the map
            if (cardList.length === 0) {
                availableCards.delete(selectedCard.scryfallID); // Remove the card from the map if no copies are left
            }
        }
    }
}

/**
 * Serialize the generated boosters into a compressed URL-friendly string.
 */
const serializeBoosters = (boosters: ManaBox.Card[][]): string => {
    const serializedBoosters: App.PlayBoosterSerialized[] = boosters.map(
        (booster) => ({
            s: booster[0].setCode,
            c: booster.map((card) => ({
                b: card.binderType,
                c: card.collectorNumber,
                f: card.foil,
                n: card.name,
                r: card.rarity,
            })),
        })
    );

    const json = JSON.stringify(serializedBoosters);

    const compressed = LZString.compressToEncodedURIComponent(json);

    return compressed;
};

/**
 * Deserialize the serialized boosters from the URL query string.
 */
export const deserializeBoosters = (
    query?: string | null
): App.PlayBoosterSerialized[] => {
    if (!query) return [];

    try {
        const decompressed = LZString.decompressFromEncodedURIComponent(query);

        const parsed: App.PlayBoosterSerialized[] = JSON.parse(
            decompressed || "{}"
        );

        return parsed;
    } catch (error) {
        console.error("Failed to parse boosters from URL:", error);
        return [];
    }
};
