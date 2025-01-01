import { type Card } from "@/types";

/**
 * Get the total card count.
 */
export const getCardCount = (cards: Card[]): number => {
    if (cards.some((card) => card.quantity < 0)) {
        throw new Error("Card quantity cannot be negative.");
    }

    return cards.reduce((acc, card) => acc + card.quantity, 0);
};
