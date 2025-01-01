import { BASIC_LAND_NAMES, PLAY_BOOSTER_RULES } from "@/constants";
import {
    getBoosterRuleSlotItemCards,
    getCardsMap,
    getOrderedBoosterRuleSlotItems,
    type CardCountBySetCode,
} from "@/utils";
import { type Card, type PlayBooster } from "@/types";

type GenerateBoostersProps = {
    allocatedBoosterCountBySetCode: CardCountBySetCode;
    cards: Card[];
};

type GenerateBoostersResponse = {
    boosters: PlayBooster[];
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
    const cardsWithAllocatedSetCodes = cards.filter((card) => {
        return Object.keys(allocatedBoosterCountBySetCode).includes(
            card.setCode
        );
    });

    if (cardsWithAllocatedSetCodes.length === 0) {
        response.errors.push(
            "No cards matching any allocated set codes found."
        );
        return response;
    }

    // 3) Create a map to track available cards with their quantities
    const availableCardsMap = getCardsMap(cardsWithAllocatedSetCodes);

    if (availableCardsMap.size === 0) {
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

            // Loop through each allocatedBoosterCount and generate a booster
            for (
                let boosterIndex = 0;
                boosterIndex < allocatedBoosterCount;
                boosterIndex++
            ) {
                const booster: PlayBooster = {
                    setCode,
                    cards: [],
                };

                const boosterCardNames = new Set<string>(); // Track card names in this booster

                // Get that set's booster rule, otherwise use the generic booster rule
                const boosterRuleExists = Object.keys(
                    PLAY_BOOSTER_RULES
                ).includes(setCode.toLowerCase());

                const boosterRule = boosterRuleExists
                    ? PLAY_BOOSTER_RULES[setCode.toLowerCase()]
                    : PLAY_BOOSTER_RULES.generic;

                // Loop through each slot in the booster rule
                boosterRule.slots.forEach((slot, slotIndex) => {
                    const orderedSlots = getOrderedBoosterRuleSlotItems(slot); // Get ordered slots

                    let cardAdded = false; // Flag to track if we've added a card for this slot

                    // Try the ordered slots in order until we find a card
                    for (const selectedSlot of orderedSlots) {
                        let slotCards = getBoosterRuleSlotItemCards({
                            availableCardsMap,
                            selectedSlot,
                            setCode,
                        });

                        // Handle specific case for basic lands
                        if (
                            selectedSlot.superType === "basic" &&
                            selectedSlot.type === "land"
                        ) {
                            slotCards = slotCards.filter((card) =>
                                BASIC_LAND_NAMES.includes(card.name)
                            );
                        } else {
                            // Exclude basic lands for other slots
                            slotCards = slotCards.filter(
                                (card) => !BASIC_LAND_NAMES.includes(card.name)
                            );
                        }

                        // Filter out duplicate card names
                        const nonDuplicateCards = slotCards.filter(
                            (card) => !boosterCardNames.has(card.name)
                        );

                        if (nonDuplicateCards.length > 0) {
                            // Randomly select a card from the matching cards
                            const selectedCard =
                                nonDuplicateCards[
                                    Math.floor(
                                        Math.random() * nonDuplicateCards.length
                                    )
                                ];

                            // Add the selected card to the booster
                            booster.cards.push(selectedCard);

                            // Remove the selected card from the available cards
                            availableCardsMap
                                .get(selectedCard.scryfallID)
                                ?.shift();

                            boosterCardNames.add(selectedCard.name);

                            cardAdded = true; // Mark as card added
                            break; // Stop after the first valid selection
                        }
                    }

                    // If no card was added for this slot, log an error
                    if (!cardAdded) {
                        response.errors.push(
                            `[Booster: ${boosterIndex} | Slot: ${slotIndex}] No available cards found for slot: ${JSON.stringify(
                                orderedSlots
                            )}`
                        );
                    }
                });

                // Add the booster to the response if it has cards
                if (booster.cards.length > 0) {
                    response.boosters.push(booster);
                }
            }
        }
    );

    return response;
};
