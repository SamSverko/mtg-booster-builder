import { ManaBox, MTG } from "@/types";

/**
 * General
 */
export type CardCountBySetCode = {
    [key: string]: number;
};

export type CardData = {
    cards: ManaBox.Card[];
    cardCount: number;
    cardCountBySetCode: CardCountBySetCode;
};

export type CardCountByBinderType = {
    [key in ManaBox.BinderType]?: number;
};

export type AllocatedBoosterCountBySetCode = CardCountBySetCode;

/**
 * Play Boosters
 */

/**
 * A single card option for inclusion or exclusion in a Play Booster slot.
 */
export type PlayBoosterSlotItemOption = {
    collectorNumber: ManaBox.Card["collectorNumber"];
    setCode: ManaBox.Card["setCode"];
};

/**
 * Represents a single slot in a Play Booster with rules for allowed or denied card options.
 */
export type PlayBoosterSlotItem = {
    foil: ManaBox.CardFoil;
    percentage: number;
    rarity: ManaBox.CardRarity;
    /**
     * A list of specific cards that are explicitly allowed in this slot.
     * If provided, the selected card must match one of these options.
     */
    allowList?: PlayBoosterSlotItemOption[];
    /**
     * A list of specific cards that are explicitly denied for this slot.
     * If provided, the selected card must not match any of these options.
     */
    denyList?: PlayBoosterSlotItemOption[];
    /**
     * @deprecated - Kinda? It's needed for the generic Play Booster, but use allowList and denyList instead for set-specific Play Boosters.
     */
    superType?: MTG.CardSupertype;
    /**
     * @deprecated - Kinda? It's needed for the generic Play Booster, but use allowList and denyList instead for set-specific Play Boosters.
     */
    type?: MTG.CardType;
}[];

/**
 * Represents a Play Booster, containing a set code and a list of slot configurations.
 */
export type PlayBooster = {
    /**
     * The set code for the booster, if applicable.
     */
    setCode?: string;
    /**
     * The list of slots in this booster, defining rarity, types, and constraints.
     */
    slots: PlayBoosterSlotItem[];
};

/**
 * Play Boosters (condensed)
 *
 * Used to store the generated boosters data in a URL query string.
 */
export type PlayBoosterCardCondensed = {
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

export type PlayBoosterCondensed = {
    /**
     * Set Code
     */
    s: ManaBox.Card["setCode"];
    /**
     * Cards
     */
    c: PlayBoosterCardCondensed[];
};
