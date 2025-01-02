import { BASIC_LAND_NAMES } from "@/constants";
import { type Card, type PlayBoosterRuleSlotItem } from "@/types";

type GetBoosterRuleSlotItemCardsProps = {
    availableCardsMap: Map<string, Card[]>;
    selectedSlot: PlayBoosterRuleSlotItem;
    setCode: Card["setCode"];
};

/**
 * Get the cards that match the selected slot item
 */
export const getBoosterRuleSlotItemCards = ({
    availableCardsMap,
    selectedSlot,
    setCode,
}: GetBoosterRuleSlotItemCardsProps): Card[] => {
    const matchingCards: Card[] = [];

    availableCardsMap.forEach((cards) => {
        cards.forEach((card) => {
            // If the slot is the generic basic land slot, only add basic lands
            if (
                selectedSlot.superType === "basic" &&
                selectedSlot.type === "land"
            ) {
                if (BASIC_LAND_NAMES.includes(card.name)) {
                    for (let i = 0; i < card.quantity; i++) {
                        matchingCards.push(card);
                    }
                }
                return; // Skip further checks if it's a basic land slot
            }

            // Check if card matches the rarity, foil, and setCode criteria
            const matchesRarityFoilAndSetCode =
                card.rarity === selectedSlot.rarity &&
                card.foil === selectedSlot.foil &&
                card.setCode === setCode;

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

            // If the card matches rarity, foil, and setCode, add it
            if (matchesRarityFoilAndSetCode) {
                // If it's in the denyList, skip it
                if (!isAllowed) {
                    return;
                }

                for (let i = 0; i < card.quantity; i++) {
                    matchingCards.push(card);
                }
            }
            // If the first check fails but the card is in the allowList, add it
            else if (
                selectedSlot.allowList &&
                selectedSlot.allowList.some(
                    (allowedCard) =>
                        allowedCard.collectorNumber === card.collectorNumber
                )
            ) {
                for (let i = 0; i < card.quantity; i++) {
                    matchingCards.push(card);
                }
            }
        });
    });

    return matchingCards;
};
