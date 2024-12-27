import { App, ManaBox } from "@/types";

/**
 * Get the total card count by setCode
 */
export function getCardCountBySetCode(
    cards: ManaBox.Card[]
): App.CardCountBySetCode {
    const cardCount = cards.reduce((acc: App.CardCountBySetCode, card) => {
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
}
