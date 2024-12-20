import LZString from "lz-string";

import {
    AllocatedBoosterCountBySet,
    ManaBoxCard,
    ManaBoxCardSerialized,
    PlayBoosterSlotItem,
} from "@/app/types";
import { BASIC_LAND_NAMES, PLAY_BOOSTER } from "@/app/constants";

export function generateBoosters(
    cards: ManaBoxCard[] | undefined,
    allocatedBoosterCountBySet: AllocatedBoosterCountBySet
) {
    if (!cards || cards.length === 0) {
        console.warn("No cards available to generate boosters.");
        return undefined;
    }

    const generatedBoosters: ManaBoxCard[][] = [];

    Object.entries(allocatedBoosterCountBySet).map(
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
            } else {
                console.log(
                    `Found ${setCards.length} cards for set code: ${setCode}`
                );

                // Create a map to track available cards with quantities
                const availableCards = new Map<string, ManaBoxCard[]>();

                // Populate the available cards map based on card quantities
                setCards.forEach((card) => {
                    if (!availableCards.has(card.scryfallID)) {
                        availableCards.set(card.scryfallID, []);
                    }

                    // Push the card into the map according to its quantity
                    for (let i = 0; i < card.quantity; i++) {
                        availableCards.get(card.scryfallID)?.push(card);
                    }
                });

                // Generate the required number of boosters
                for (let i = 0; i < allocatedBoosterCount; i++) {
                    const usedScryfallIDs = new Set<string>(); // Track scryfallIDs for this booster
                    const booster: ManaBoxCard[] = [];

                    // Generate booster with unique scryfallIDs
                    PLAY_BOOSTER.slots.forEach((slot) => {
                        // Select a card for each slot
                        const selectedSlot = getRandomSlotItem(slot);

                        // Filter matching cards first
                        let matchingCards = filterMatchingCards(
                            availableCards,
                            selectedSlot
                        );

                        if (
                            slot[0].superType === "basic" &&
                            slot[0].type === "land"
                        ) {
                            // Include only basic lands
                            matchingCards = matchingCards.filter((card) =>
                                BASIC_LAND_NAMES.includes(card.name)
                            );
                        } else {
                            // Exclude basic lands
                            matchingCards = matchingCards.filter(
                                (card) => !BASIC_LAND_NAMES.includes(card.name)
                            );
                        }

                        // Shuffle matching cards
                        matchingCards.sort(() => Math.random() - 0.5);

                        if (matchingCards.length > 0) {
                            // Select the first available card
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

                    // If a booster was successfully generated, add it to the final boosters array
                    if (booster.length === 14) {
                        generatedBoosters.push(booster);
                        console.log(
                            `Booster ${i + 1} generated for set ${setCode}:`,
                            booster
                        );
                    } else {
                        console.warn(
                            `Booster ${
                                i + 1
                            } failed to generate for set ${setCode}`
                        );
                    }
                }
            }
        }
    );

    return serializeBoosters(generatedBoosters);
}

function getRandomSlotItem(slot: PlayBoosterSlotItem) {
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

function filterMatchingCards(
    availableCards: Map<string, ManaBoxCard[]>,
    selectedSlot: PlayBoosterSlotItem[0]
) {
    // Filter cards by rarity and foil
    const matchingCards: ManaBoxCard[] = [];

    availableCards.forEach((cards) => {
        cards.forEach((card) => {
            if (
                card.rarity === selectedSlot.rarity &&
                card.foil === selectedSlot.foil
            ) {
                matchingCards.push(card);
            }
        });
    });

    return matchingCards;
}

function removeCardFromAvailableCards(
    availableCards: Map<string, ManaBoxCard[]>,
    selectedCard: ManaBoxCard
) {
    const cardList = availableCards.get(selectedCard.scryfallID);
    if (cardList) {
        const index = cardList.findIndex((card) => card === selectedCard);
        if (index !== -1) {
            cardList.splice(index, 1); // Remove the card from the list
            if (cardList.length === 0) {
                availableCards.delete(selectedCard.scryfallID); // If no more copies are left, remove the card from the map
            }
        }
    }
}

const serializeBoosters = (boosters: ManaBoxCard[][]): string => {
    const minimalBoosters = boosters.map((booster) =>
        booster.map(({ collectorNumber, foil, name, setCode }) => ({
            c: collectorNumber,
            f: foil,
            n: name,
            s: setCode,
        }))
    );

    const json = JSON.stringify(minimalBoosters);

    const compressed = LZString.compressToEncodedURIComponent(json);

    return compressed;
};

export const deserializeBoosters = (
    query: string
): ManaBoxCardSerialized[][] => {
    if (!query) return [];

    try {
        const decompressed = LZString.decompressFromEncodedURIComponent(query);

        const parsed: {
            boosters: {
                c: ManaBoxCard["collectorNumber"];
                f: ManaBoxCard["foil"];
                n: ManaBoxCard["name"];
                s: ManaBoxCard["setCode"];
            }[][];
        } = JSON.parse(decompressed || "{}");

        const { boosters: parsedBoosters } = parsed;

        if (!parsedBoosters) {
            console.error("Invalid data structure for boosters");
            return [];
        }

        const boosters: ManaBoxCardSerialized[][] = parsedBoosters.map(
            (booster) =>
                booster.map((card) => ({
                    collectorNumber: card.c,
                    foil: card.f,
                    name: card.n,
                    setCode: card.s,
                }))
        );

        return boosters;
    } catch (error) {
        console.error("Failed to parse boosters from URL:", error);
        return [];
    }
};
