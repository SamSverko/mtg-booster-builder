import { App, ManaBox } from "@/types";

/**
 * Get the total card count by setCode
 */
export function getCardCountBySetCode(
    cards: ManaBox.Card[]
): App.CardCountBySetCode {
    return Object.fromEntries(
        Object.entries(
            cards.reduce((acc: App.CardCountBySetCode, card) => {
                acc[card.setCode] = (acc[card.setCode] || 0) + card.quantity;
                return acc;
            }, {})
        ).sort(([, countA], [, countB]) => countB - countA)
    );
}
