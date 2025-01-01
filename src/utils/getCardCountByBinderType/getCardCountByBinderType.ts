import { type BinderType, type Card } from "@/types";

export type CardCountByBinderType = {
    [key in BinderType]?: number;
};

/**
 * Get the total card count by binderType
 */
export const getCardCountByBinderType = (
    cards: Card[]
): CardCountByBinderType => {
    const cardCount = cards.reduce((acc: CardCountByBinderType, card) => {
        if (card.quantity < 0) {
            throw new Error(
                `Quantity for card in binder type ${card.binderType} cannot be negative.`
            );
        }

        acc[card.binderType] = (acc[card.binderType] || 0) + card.quantity;
        return acc;
    }, {});

    return Object.fromEntries(
        Object.entries(cardCount).sort(
            ([, countA], [, countB]) => countB - countA
        )
    );
};
