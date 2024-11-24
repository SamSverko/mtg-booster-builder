import {
    ManaBoxCard,
    PlayBoosterSlotItem,
    SetCodeWithCardCount,
} from "@/app/types";
import { PLAY_BOOSTER } from "@/app/constants";

export function getBoosters(
    cards: ManaBoxCard[] | null,
    boosterAllocation: SetCodeWithCardCount[]
): ManaBoxCard[][] {
    if (!cards || cards.length === 0) {
        console.warn("No cards available to generate boosters.");
        return []; // Return an empty array if no cards are available
    }

    const allGeneratedBoosters: ManaBoxCard[][] = []; // Array to hold all boosters for each set

    boosterAllocation.forEach((setCodeWithCardCount) => {
        const { allocatedBoosterCount, setCode } = setCodeWithCardCount;

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

            setCards.forEach((card) => {
                if (!availableCards.has(card.scryfallID)) {
                    availableCards.set(card.scryfallID, []);
                }

                // Add the card multiple times based on its quantity
                for (let i = 0; i < card.quantity; i++) {
                    availableCards.get(card.scryfallID)?.push(card);
                }
            });

            // Generate the required number of boosters for this set
            for (let i = 0; i < allocatedBoosterCount; i++) {
                console.log(`Generating booster ${i + 1} for set: ${setCode}`);

                // We need to clear the slots array before filling it
                const boosterSlots: ManaBoxCard[] = [];

                PLAY_BOOSTER.slots.forEach((slot) => {
                    const selectedSlot = getRandomSlotItem(slot);

                    const matchingCards = filterMatchingCards(
                        availableCards,
                        selectedSlot
                    );

                    if (matchingCards.length === 0) {
                        console.warn(
                            `No cards found for rarity ${selectedSlot.rarity} and foil ${selectedSlot.foil}`
                        );
                    } else {
                        // Select a random card from the matching cards
                        const selectedCard =
                            matchingCards[
                                Math.floor(Math.random() * matchingCards.length)
                            ];

                        // Remove the selected card from available cards
                        removeCardFromAvailableCards(
                            availableCards,
                            selectedCard
                        );

                        // Add the selected card to the booster slots array
                        boosterSlots.push(selectedCard);
                    }
                });

                // After generating the booster for this iteration, add it to the final result as a separate array
                console.log(
                    `Booster ${i + 1} generated for set ${setCode}:`,
                    boosterSlots
                );
                allGeneratedBoosters.push(boosterSlots);
            }
        }
    });

    console.log(`Final generated boosters structure:`, allGeneratedBoosters);

    return allGeneratedBoosters; // Return the final array of arrays
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
