import { ManaBox } from "@/types";

export type CardCountBySetCode = {
    [key: string]: number;
};

/**
 * Get the total card count by setCode
 */
export const getCardCountBySetCode = (
    cards: ManaBox.Card[]
): CardCountBySetCode => {
    const cardCount = cards.reduce((acc: CardCountBySetCode, card) => {
        if (card.quantity < 0) {
            throw new Error(
                `Quantity for card in set ${card.setCode} cannot be negative.`
            );
        }

        acc[card.setCode] = (acc[card.setCode] || 0) + card.quantity;
        return acc;
    }, {});

    return Object.fromEntries(
        Object.entries(cardCount).sort(
            ([, countA], [, countB]) => countB - countA
        )
    );
};
