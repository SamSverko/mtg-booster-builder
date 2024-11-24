type CardCondition =
    | "mint"
    | "near_mint"
    | "excellent"
    | "good"
    | "light_played"
    | "played"
    | "poor";
type CardFoil = "normal" | "foil" | "etched";
type CardRarity = "common" | "uncommon" | "rare" | "mythic";
export type CardSupertype = "basic"; // add more as needed
export type CardType = "land"; // add more as needed

type FixedLengthArray<
    T,
    L extends number,
    R extends unknown[] = []
> = R["length"] extends L ? R : FixedLengthArray<T, L, [T, ...R]>;

export type Format = {
    minPlayerCount: number;
    name: string;
    boosterPerPlayerCount?: number;
    deckSize?: number;
    details?: string;
    duration?: number; // minutes
    maxPlayerCount?: number;
    url?: string;
};

export type ManaBoxCard = {
    binderName: string;
    binderType: "binder" | "deck" | "list";
    Name: string;
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

type PlayBoosterSlotItem = {
    foil: CardFoil;
    percentage: number;
    rarity: CardRarity;
    superType?: CardSupertype;
    type?: CardType;
}[];

export type PlayBooster = {
    setCode?: string;
    slots: FixedLengthArray<PlayBoosterSlotItem, 14>;
};

export type SetCodeWithCardCount = {
    allocatedBoosterCount: number;
    count: number;
    setCode: string;
};
