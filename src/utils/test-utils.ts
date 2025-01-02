import { BASIC_LAND_NAMES, PLAY_BOOSTER_RULE } from "@/constants";
import { type Card, type PlayBooster } from "@/types";

type GenerateMockBoosterProps = {
    setCode?: PlayBooster["setCode"];
    cardProps?: GenerateMockCardProps[];
};

/**
 * Generate a mock booster.
 *
 * TODO - Implement logic for booster generation, when ready.
 */
export const generateMockBooster = ({
    setCode = "ABC",
    cardProps = [],
}: GenerateMockBoosterProps = {}): PlayBooster => {
    return {
        setCode,
        cards: Array.from({
            length: PLAY_BOOSTER_RULE.slots.length,
        }).map((_, i) => generateMockCard(cardProps[i] || {})),
    };
};

type GenerateMockBoostersProps = {
    boosterProps?: GenerateMockBoosterProps[];
    count?: number;
};

/**
 * Generate mock boosters.
 */
export const generateMockBoosters = ({
    boosterProps = [],
    count,
}: GenerateMockBoostersProps = {}): PlayBooster[] => {
    count =
        count !== undefined && count !== null
            ? count
            : boosterProps.length || getRandomNumber(1, 5);

    return Array.from({ length: count }).map((_, i) =>
        generateMockBooster(boosterProps[i] || {})
    );
};

type GenerateMockCardProps = {
    binderName?: Card["binderName"];
    binderType?: Card["binderType"];
    collectorNumber?: Card["collectorNumber"];
    foil?: Card["foil"];
    language?: Card["language"];
    name?: Card["name"];
    purchasePriceCurrency?: Card["purchasePriceCurrency"];
    quantity?: Card["quantity"];
    rarity?: Card["rarity"];
    setCode?: Card["setCode"];
    setName?: Card["setName"];
};

/**
 * Generate a mock card.
 */
export const generateMockCard = ({
    binderName = "Mock Binder Name",
    binderType = getRandomBinderType(),
    collectorNumber = getRandomNumber(1, 300),
    foil = getRandomFoil(),
    language = "en",
    name = "Mock Card Name",
    purchasePriceCurrency = "CAD",
    quantity = getRandomNumber(1, 4),
    rarity = getRandomRarity(),
    setCode = generateMockSetCode(),
    setName = "Mock Set Name",
}: GenerateMockCardProps = {}): Card => {
    return {
        binderName,
        binderType,
        name,
        setCode,
        setName,
        collectorNumber,
        foil,
        rarity,
        quantity,
        manaBoxID: getRandomNumber(1, 100000),
        scryfallID: generateMockScryfallID(),
        purchasePrice: generateMockPurchasePrice(),
        misprint: getRandomMisprint(),
        altered: getRandomAltered(),
        condition: getRandomCondition(),
        language,
        purchasePriceCurrency,
    };
};

type GenerateMockCardsProps = {
    cardProps?: GenerateMockCardProps[];
    count?: number;
};

/**
 * Generate mock cards.
 */
export const generateMockCards = ({
    cardProps = [],
    count,
}: GenerateMockCardsProps = {}): Card[] => {
    count =
        count !== undefined && count !== null
            ? count
            : cardProps.length || getRandomNumber(1, 5);

    return Array.from({ length: count }).map((_, i) =>
        generateMockCard(cardProps[i] || {})
    );
};

type GenerateMockLibraryProps = {
    sets?: {
        setCode?: string;
        commonCardCount?: number;
        uncommonCardCount?: number;
        rareCardCount?: number;
        mythicCardCount?: number;
        commonFoilCardCount?: number;
        uncommonFoilCardCount?: number;
        rareFoilCardCount?: number;
        mythicFoilCardCount?: number;
        basicLandCardCount?: number;
        basicLandFoilCardCount?: number;
    }[];
};

/**
 * Generate a mock library.
 */
export const generateMockLibrary = ({
    sets,
}: GenerateMockLibraryProps = {}): Card[] => {
    const defaultSet = {
        setCode: "ABC",
        commonCardCount: 25,
        commonFoilCardCount: 25,
        uncommonCardCount: 25,
        uncommonFoilCardCount: 25,
        rareCardCount: 25,
        rareFoilCardCount: 25,
        mythicCardCount: 25,
        mythicFoilCardCount: 25,
        basicLandCardCount: 25,
        basicLandFoilCardCount: 25,
    };

    // Merge each set with the default set using Object.assign or spread operator
    const setsToGenerate = sets?.map((set) => ({
        ...defaultSet, // Use default values first
        ...set, // Overwrite with user-provided values
    })) || [{ ...defaultSet }]; // If no sets provided, use the default set

    const cards: Card[] = [];

    setsToGenerate.forEach((set) => {
        const setCode = set.setCode || "ABC";
        const totalCardCount =
            set.commonCardCount +
            set.commonFoilCardCount +
            set.uncommonCardCount +
            set.uncommonFoilCardCount +
            set.rareCardCount +
            set.rareFoilCardCount +
            set.mythicCardCount +
            set.mythicFoilCardCount +
            set.basicLandCardCount +
            set.basicLandFoilCardCount;

        for (let i = 0; i < totalCardCount; i++) {
            const cardProps: GenerateMockCardProps = {
                collectorNumber: i + 1,
                foil: "normal",
                name: `Mock Card ${i + 1}`,
                quantity: 1,
                rarity: "common",
                setCode,
            };

            // Assign rarity and foil based on the range of the card index
            if (i < set.commonCardCount) {
                cardProps.rarity = "common";
            } else if (i < set.commonCardCount + set.commonFoilCardCount) {
                cardProps.rarity = "common";
                cardProps.foil = "foil";
            } else if (
                i <
                set.commonCardCount +
                    set.commonFoilCardCount +
                    set.uncommonCardCount
            ) {
                cardProps.rarity = "uncommon";
            } else if (
                i <
                set.commonCardCount +
                    set.commonFoilCardCount +
                    set.uncommonCardCount +
                    set.uncommonFoilCardCount
            ) {
                cardProps.rarity = "uncommon";
                cardProps.foil = "foil";
            } else if (
                i <
                set.commonCardCount +
                    set.commonFoilCardCount +
                    set.uncommonCardCount +
                    set.uncommonFoilCardCount +
                    set.rareCardCount
            ) {
                cardProps.rarity = "rare";
            } else if (
                i <
                set.commonCardCount +
                    set.commonFoilCardCount +
                    set.uncommonCardCount +
                    set.uncommonFoilCardCount +
                    set.rareCardCount +
                    set.rareFoilCardCount
            ) {
                cardProps.rarity = "rare";
                cardProps.foil = "foil";
            } else if (
                i <
                set.commonCardCount +
                    set.commonFoilCardCount +
                    set.uncommonCardCount +
                    set.uncommonFoilCardCount +
                    set.rareCardCount +
                    set.rareFoilCardCount +
                    set.mythicCardCount
            ) {
                cardProps.rarity = "mythic";
            } else if (
                i <
                set.commonCardCount +
                    set.commonFoilCardCount +
                    set.uncommonCardCount +
                    set.uncommonFoilCardCount +
                    set.rareCardCount +
                    set.rareFoilCardCount +
                    set.mythicCardCount +
                    set.mythicFoilCardCount
            ) {
                cardProps.rarity = "mythic";
                cardProps.foil = "foil";
            } else if (
                i <
                set.commonCardCount +
                    set.commonFoilCardCount +
                    set.uncommonCardCount +
                    set.uncommonFoilCardCount +
                    set.rareCardCount +
                    set.rareFoilCardCount +
                    set.mythicCardCount +
                    set.mythicFoilCardCount +
                    set.basicLandCardCount
            ) {
                cardProps.name = BASIC_LAND_NAMES[i % 5]; // For basic land cards
            }

            const card = generateMockCard(cardProps);

            cards.push(card);
        }
    });

    return cards;
};

/**
 * Generate a mock purchasePrice.
 */
export const generateMockPurchasePrice = (): number => {
    const randomPrice = Math.random() * 100;

    return parseFloat(randomPrice.toFixed(2));
};

/**
 * Generate a mock scryfallID.
 */
export const generateMockScryfallID = (): string => {
    const template = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";

    return template.replace(/[x]/g, () => {
        const randomHex = Math.floor(Math.random() * 16).toString(16);
        return randomHex;
    });
};

/**
 * Generate a mock setCode.
 */
export const generateMockSetCode = (): string => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    return Array.from(
        { length: 3 },
        () => letters[Math.floor(Math.random() * letters.length)]
    ).join("");
};

type GetRandomAlteredProps = {
    alteredPercentage?: number;
};

/**
 * Get a random altered.
 */
export const getRandomAltered = ({
    alteredPercentage = 0.01,
}: GetRandomAlteredProps = {}): boolean => {
    if (alteredPercentage < 0 || alteredPercentage > 100) {
        throw new Error("alteredPercentage must be between 0 and 100.");
    }

    const random = Math.random() * 100;
    return random < alteredPercentage;
};

/**
 * Get a random binderType.
 */
export const getRandomBinderType = (): Card["binderType"] => {
    const binderTypes: Card["binderType"][] = ["binder", "deck", "list"];

    return binderTypes[Math.floor(Math.random() * binderTypes.length)];
};

type GetRandomConditionProps = {
    mintPercentage?: number;
    nearMintPercentage?: number;
    excellentPercentage?: number;
    goodPercentage?: number;
    lightPlayedPercentage?: number;
    playedPercentage?: number;
    poorPercentage?: number;
};

/**
 * Get a random condition.
 */
export const getRandomCondition = ({
    mintPercentage = 1,
    nearMintPercentage = 94,
    excellentPercentage = 1,
    goodPercentage = 1,
    lightPlayedPercentage = 1,
    playedPercentage = 1,
    poorPercentage = 1,
}: GetRandomConditionProps = {}): Card["condition"] => {
    const percentages = [
        { condition: "mint", percentage: mintPercentage },
        { condition: "near_mint", percentage: nearMintPercentage },
        { condition: "excellent", percentage: excellentPercentage },
        { condition: "good", percentage: goodPercentage },
        { condition: "light_played", percentage: lightPlayedPercentage },
        { condition: "played", percentage: playedPercentage },
        { condition: "poor", percentage: poorPercentage },
    ];

    const totalPercentage = percentages.reduce(
        (sum, { percentage }) => sum + percentage,
        0
    );

    if (totalPercentage !== 100) {
        throw new Error("Percentages must add up to 100.");
    }

    const random = Math.random() * 100;
    let cumulative = 0;

    for (const { condition, percentage } of percentages) {
        cumulative += percentage;
        if (random < cumulative) {
            return condition as Card["condition"];
        }
    }

    throw new Error("Unexpected error in random condition calculation.");
};

type GetRandomFoilProps = {
    etchedPercentage?: number;
    foilPercentage?: number;
    normalPercentage?: number;
};

/**
 * Get a random foil.
 */
export const getRandomFoil = ({
    etchedPercentage = 0,
    foilPercentage = 7,
    normalPercentage = 93,
}: GetRandomFoilProps = {}): Card["foil"] => {
    const totalPercentage =
        etchedPercentage + foilPercentage + normalPercentage;

    if (totalPercentage !== 100) {
        throw new Error("Percentages must add up to 100.");
    }

    const random = Math.random() * 100;

    if (random < normalPercentage) {
        return "normal";
    } else if (random < normalPercentage + foilPercentage) {
        return "foil";
    } else {
        return "etched";
    }
};

type GetRandomMisprintProps = {
    misprintPercentage?: number;
};

/**
 * Get a random misprint.
 */
export const getRandomMisprint = ({
    misprintPercentage = 0.01,
}: GetRandomMisprintProps = {}): boolean => {
    if (misprintPercentage < 0 || misprintPercentage > 100) {
        throw new Error("misprintPercentage must be between 0 and 100.");
    }

    const random = Math.random() * 100;
    return random < misprintPercentage;
};

/**
 * Get a random number (between a min and max value).
 */
export const getRandomNumber = (min: number, max: number): number => {
    if (min > max) {
        throw new Error("min cannot be greater than max.");
    }

    return Math.floor(Math.random() * (max - min + 1)) + min;
};

type GetRandomRarityProps = {
    commonPercentage?: number;
    uncommonPercentage?: number;
    rarePercentage?: number;
    mythicPercentage?: number;
};

/**
 * Get a random rarity.
 */
export const getRandomRarity = ({
    commonPercentage = 58.82,
    mythicPercentage = 0.74,
    rarePercentage = 5.15,
    uncommonPercentage = 35.29,
}: GetRandomRarityProps = {}): Card["rarity"] => {
    const totalPercentage =
        commonPercentage +
        uncommonPercentage +
        rarePercentage +
        mythicPercentage;

    if (totalPercentage !== 100) {
        throw new Error("Percentages must add up to 100.");
    }

    const random = Math.random() * 100;

    if (random < commonPercentage) {
        return "common";
    } else if (random < commonPercentage + uncommonPercentage) {
        return "uncommon";
    } else if (
        random <
        commonPercentage + uncommonPercentage + rarePercentage
    ) {
        return "rare";
    } else {
        return "mythic";
    }
};
