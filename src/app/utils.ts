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

    const generatedBoosters: ManaBoxCard[][] = []; // Initialize as an array of arrays

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

                    // Get cards matching the rarity and foil
                    const matchingCards = filterMatchingCards(
                        availableCards,
                        selectedSlot
                    );

                    if (matchingCards) {
                        let selectedCard: ManaBoxCard | null = null;

                        // Try to select a card with a unique scryfallID
                        for (let j = 0; j < matchingCards.length; j++) {
                            const card = matchingCards[j];

                            // Ensure the card hasn't already been selected for this booster
                            if (!usedScryfallIDs.has(card.scryfallID)) {
                                selectedCard = card;
                                usedScryfallIDs.add(card.scryfallID);
                                break;
                            }
                        }

                        if (selectedCard) {
                            // Decrease the quantity of the selected card
                            removeCardFromAvailableCards(
                                availableCards,
                                selectedCard
                            );

                            // Add the selected card to the booster
                            booster.push(selectedCard);
                        } else {
                            console.warn(
                                `Could not find a unique card for rarity ${selectedSlot.rarity} and foil ${selectedSlot.foil} in set ${setCode}`
                            );
                        }
                    } else {
                        console.warn(
                            `No cards found for rarity ${selectedSlot.rarity} and foil ${selectedSlot.foil}`
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
                        `Booster ${i + 1} failed to generate for set ${setCode}`
                    );
                }
            }
        }
    });

    return generatedBoosters;
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
