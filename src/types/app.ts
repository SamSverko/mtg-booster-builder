import { ManaBox, MTG } from "@/types";

/**
 * General
 */
export type CardCountBySet = {
    [key: string]: number;
};

export type CardData = {
    cards: ManaBox.Card[];
    cardCount: number;
    cardCountBySet: CardCountBySet;
};

export type CardCountByLocation = {
    [key in ManaBox.BinderType]?: number;
};

export type AllocatedBoosterCountBySet = CardCountBySet;

/**
 * Play Boosters
 */
export type PlayBoosterSlotItem = {
    foil: ManaBox.CardFoil;
    percentage: number;
    rarity: ManaBox.CardRarity;
    superType?: MTG.CardSupertype;
    type?: MTG.CardType;
}[];

export type PlayBooster = {
    setCode?: string;
    slots: PlayBoosterSlotItem[];
};

/**
 * Play Boosters (serialized)
 *
 * Used to store the generated boosters data in a URL query string.
 */
export type PlayBoosterCardSerialized = {
    /**
     * binderType
     */
    b: ManaBox.Card["binderType"];
    /**
     * Collector Number
     */
    c: ManaBox.Card["collectorNumber"];
    /**
     * Foil
     */
    f: ManaBox.Card["foil"];
    /**
     * Name
     */
    n: ManaBox.Card["name"];
    /**
     * Rarity
     */
    r: ManaBox.Card["rarity"];
};

export type PlayBoosterSerialized = {
    /**
     * Set Code
     */
    s: ManaBox.Card["setCode"];
    /**
     * Cards
     */
    c: PlayBoosterCardSerialized[];
};
