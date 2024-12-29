import { ManaBox, MTG } from "@/types";

/**
 * General
 */

export type CardData = {
    cards: ManaBox.Card[];
    cardCount: number;
    cardCountBySetCode: CardCountBySetCode;
};

export type AllocatedBoosterCountBySetCode = CardCountBySetCode;

/**
 * Play Boosters
 */

export type PlayBooster = {
    setCode: ManaBox.Card["setCode"];
    cards: ManaBox.Card[];
};

/**
 * Play Boosters Rules
 */

/**
 * Represents a Play Booster, containing a set code and a list of slot configurations.
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
    foil: ManaBox.CardFoil;
    percentage: number;
    rarity: ManaBox.CardRarity;
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
    superType?: MTG.CardSupertype;
    /**
     * @deprecated - Kinda? It's needed for the generic Play Booster, but use allowList and denyList instead for set-specific Play Boosters.
     */
    type?: MTG.CardType;
};

/**
 * A single card option for inclusion or exclusion in a Play Booster slot.
 */
export type PlayBoosterRuleSlotItemOption = {
    collectorNumber: ManaBox.Card["collectorNumber"];
    setCode: ManaBox.Card["setCode"];
};
