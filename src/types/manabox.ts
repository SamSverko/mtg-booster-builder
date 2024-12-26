/**
 * ManaBox card attributes
 */
export type CardCondition =
    | "mint"
    | "near_mint"
    | "excellent"
    | "good"
    | "light_played"
    | "played"
    | "poor";
export type CardFoil = "normal" | "foil" | "etched";
export type CardRarity = "common" | "uncommon" | "rare" | "mythic";

/**
 * ManaBox card
 */
export type Card = {
    binderName: string;
    binderType: "binder" | "deck" | "list";
    name: string;
    setCode: string;
    setName: string;
    collectorNumber: number;
    foil: CardFoil;
    rarity: CardRarity;
    quantity: number;
    manaBoxID: number;
    scryfallID: string;
    purchasePrice: number;
    misprint: boolean;
    altered: boolean;
    condition: CardCondition;
    language: string;
    purchasePriceCurrency: string;
};
