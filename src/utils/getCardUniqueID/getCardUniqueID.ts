import { Card } from "@/types";

export const getCardUniqueID = (card: Card) => {
    return `${card.scryfallID}_${card.foil}`;
};
