/**
 * Card =======================================================================
 */
export type BinderType = "binder" | "deck" | "list";
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
export type CardSupertype = "basic"; // add more as needed
export type CardType = "land"; // add more as needed

/**
 * Represents a Card (ManaBox).
 */
export type Card = {
    binderName: string;
    binderType: BinderType;
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

/**
 * Format =====================================================================
 */
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

/**
 * Play Booster ===============================================================
 */
export type PlayBooster = {
    setCode: Card["setCode"];
    cards: Card[];
};

/**
 * Play Boosters Rules ========================================================
 */

/**
 * Represents rules for a Play Booster, containing a set code and a list of slot configurations.
 */
export type PlayBoosterRule = {
    /**
     * The set code for the booster, if applicable.
     */
    setCode?: string;
    /**
     * The list of slots in this booster, defining rarity, types, and constraints.
     */
    slots: PlayBoosterRuleSlot[];
};

/**
 * Represents a single slot in a Play Booster with rules for allowed or denied card options.
 */
export type PlayBoosterRuleSlot = PlayBoosterRuleSlotItem[];

/**
 * Represents a single slot item in a Play Booster with rules for allowed or denied card options.
 */
export type PlayBoosterRuleSlotItem = {
    foil: CardFoil;
    percentage: number;
    rarity: CardRarity;
    /**
     * A list of specific cards that are explicitly allowed in this slot.
     * If provided, the selected card must match one of these options.
     */
    allowList?: PlayBoosterRuleSlotItemOption[];
    /**
     * A list of specific cards that are explicitly denied for this slot.
     * If provided, the selected card must not match any of these options.
     */
    denyList?: PlayBoosterRuleSlotItemOption[];
    /**
     * @deprecated - Kinda? It's needed for the generic Play Booster, but use allowList and denyList instead for set-specific Play Boosters.
     */
    superType?: CardSupertype;
    /**
     * @deprecated - Kinda? It's needed for the generic Play Booster, but use allowList and denyList instead for set-specific Play Boosters.
     */
    type?: CardType;
};

/**
 * A single card option for inclusion or exclusion in a Play Booster slot.
 */
export type PlayBoosterRuleSlotItemOption = {
    collectorNumber: Card["collectorNumber"];
    setCode: Card["setCode"];
};
