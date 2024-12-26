/**
 * Card attributes
 */
export type CardSupertype = "basic"; // add more as needed
export type CardType = "land"; // add more as needed

/**
 * Format
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
