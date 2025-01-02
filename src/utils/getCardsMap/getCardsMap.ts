import { type Card } from "@/types";
import { getCardUniqueID } from "@/utils";

/**
 * Get a map of cards based on their uniqueID (scryfallID + foil status).
 *
 * Split out the card quantity into individual card entries (e.g. a card with quantity: 3 will be split into 3 card entries with quantity: 1).
 */
export const getCardsMap = (cards: Card[]) => {
    const cardsMap = new Map<string, Card[]>();

    cards.forEach((card) => {
        // Create a uniqueID for each card based on scryfallID and foil status
        const uniqueID = getCardUniqueID(card);

        // If the card isn't already in the map, add it
        if (!cardsMap.has(uniqueID)) {
            cardsMap.set(uniqueID, []);
        }

        // Push card copies into the map based on quantity
        for (let i = 0; i < card.quantity; i++) {
            cardsMap.get(uniqueID)?.push({
                ...card,
                quantity: 1,
            });
        }
    });

    return cardsMap;
};
