import { App, ManaBox } from "@/types";

type GetBoosterRuleSlotItemCardsProps = {
    availableCardsMap: Map<string, ManaBox.Card[]>;
    selectedSlot: App.PlayBoosterRuleSlotItem;
};

/**
 * Get the cards that match the selected slot item
 */
export const getBoosterRuleSlotItemCards = ({
    availableCardsMap,
    selectedSlot,
}: GetBoosterRuleSlotItemCardsProps): ManaBox.Card[] => {
    const matchingCards: ManaBox.Card[] = [];

    availableCardsMap.forEach((cards) => {
        cards.forEach((card) => {
            // Check if card matches the rarity and foil criteria
            const matchesRarityAndFoil =
                card.rarity === selectedSlot.rarity &&
                card.foil === selectedSlot.foil;

            // Check if the card is allowed by the allowList and not excluded by the denyList
            const isAllowed =
                (selectedSlot.allowList
                    ? selectedSlot.allowList.some(
                          (allowedCard) =>
                              allowedCard.collectorNumber ===
                              card.collectorNumber
                      )
                    : true) &&
                (selectedSlot.denyList
                    ? !selectedSlot.denyList.some(
                          (deniedCard) =>
                              deniedCard.collectorNumber ===
                              card.collectorNumber
                      )
                    : true);

            // If it matches and is allowed, add the card to the matchingCards array
            if (matchesRarityAndFoil && isAllowed) {
                for (let i = 0; i < card.quantity; i++) {
                    matchingCards.push(card);
                }
            }
        });
    });

    return matchingCards;
};
