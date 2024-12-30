import { MTG } from "@/constants";
import { getBoosterRuleSlotItem, type CardCountBySetCode } from "@/utils";
import { App, ManaBox } from "@/types";

type GenerateBoostersProps = {
    allocatedBoosterCountBySetCode: CardCountBySetCode;
    cards: ManaBox.Card[];
};

type GenerateBoostersResponse = {
    boosters: App.PlayBooster[];
    errors: string[];
};

/**
 * Generate a set of boosters based on the provided cards.
 */
export const generateBoosters = ({
    allocatedBoosterCountBySetCode,
    cards,
}: GenerateBoostersProps): GenerateBoostersResponse => {
    const response: GenerateBoostersResponse = {
        boosters: [],
        errors: [],
    };

    // 1) Ensure cards are provided
    if (cards.length === 0) {
        response.errors.push("No cards provided.");
        return response;
    }

    // 2) Filter cards based on the allocatedBoosterCountBySetCode
    const cardsWithMatchingSetCode = cards.filter((card) => {
        return Object.keys(allocatedBoosterCountBySetCode).includes(
            card.setCode
        );
    });

    if (cardsWithMatchingSetCode.length === 0) {
        response.errors.push("No cards with matching set code found.");
        return response;
    }

    // 3) Create a map to track available cards with their quantities
    const availableCards = new Map<string, ManaBox.Card[]>();

    cardsWithMatchingSetCode.forEach((card) => {
        // If the card isn't already in the map, add it
        if (!availableCards.has(card.scryfallID)) {
            availableCards.set(card.scryfallID, []);
        }

        // Push card copies into the map based on quantity
        for (let i = 0; i < card.quantity; i++) {
            availableCards.get(card.scryfallID)?.push({
                ...card,
                quantity: 1,
            });
        }
    });

    if (availableCards.size === 0) {
        response.errors.push("No cards available.");
        return response;
    }

    // 4) Loop through each setCode and generate Boosters
    Object.entries(allocatedBoosterCountBySetCode).forEach(
        ([setCode, allocatedBoosterCount]) => {
            if (allocatedBoosterCount <= 0) {
                response.errors.push(
                    `Skipping ${setCode} as allocated booster count is 0 or less.`
                );
                return;
            }

            // Filter cards based on setCode
            const setCards = cardsWithMatchingSetCode.filter(
                (card) => card.setCode === setCode
            );

            if (setCards.length === 0) {
                response.errors.push(`No cards found for set code: ${setCode}`);
                return;
            }

            // Loop through each allocatedBoosterCount and generate a booster
            for (let i = 0; i < allocatedBoosterCount; i++) {
                const usedScryfallIDs = new Set<string>();
                const booster: App.PlayBooster = {
                    setCode,
                    cards: [],
                };

                // Loop through each slot in the booster rule
                MTG.PLAY_BOOSTER_RULE.slots.forEach((slot) => {
                    const selectedSlot = getBoosterRuleSlotItem(slot);

                    // Filter matching cards
                    // TODO - break out into a separate function with tests
                    const matchingCards = filterMatchingCards(
                        availableCards,
                        selectedSlot
                    );

                    if (matchingCards.length === 0) {
                        response.errors.push(
                            `No matching cards found for slot: ${JSON.stringify(
                                selectedSlot
                            )}`
                        );
                        return;
                    }

                    // Randomly select a card from the matching cards
                    const selectedCard =
                        matchingCards[
                            Math.floor(Math.random() * matchingCards.length)
                        ];

                    // Add the selected card to the booster
                    booster.cards.push(selectedCard);

                    // Remove the selected card from the available cards
                    availableCards.get(selectedCard.scryfallID)?.shift();
                });

                // Add the booster to the response
                response.boosters.push(booster);
            }
        }
    );

    return response;
};

/**
 * Filter cards based on the selected slot item.
 */
function filterMatchingCards(
    availableCards: Map<string, ManaBox.Card[]>,
    selectedSlot: App.PlayBoosterRuleSlotItem
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
