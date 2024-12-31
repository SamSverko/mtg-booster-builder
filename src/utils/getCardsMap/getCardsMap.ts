import { ManaBox } from "@/types";

/**
 * Get a map of cards based on their scryfallID.
 *
 * Split out the card quantity into individual card entries (e.g. a card with quantity: 3 will be split into 3 card entries with quantity: 1).
 */
export const getCardsMap = (cards: ManaBox.Card[]) => {
    const cardsMap = new Map<string, ManaBox.Card[]>();

    cards.forEach((card) => {
        // If the card isn't already in the map, add it
        if (!cardsMap.has(card.scryfallID)) {
            cardsMap.set(card.scryfallID, []);
        }

        // Push card copies into the map based on quantity
        for (let i = 0; i < card.quantity; i++) {
            cardsMap.get(card.scryfallID)?.push({
                ...card,
                quantity: 1,
            });
        }
    });

    return cardsMap;
};
