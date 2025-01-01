import { MTG, PLAY_BOOSTER_RULES } from "@/constants";
import { App, ManaBox } from "@/types";

type GenerateMockBoosterProps = {
    setCode?: App.PlayBooster["setCode"];
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
}: GenerateMockBoosterProps = {}): App.PlayBooster => {
    return {
        setCode,
        cards: Array.from({
            length: PLAY_BOOSTER_RULES.generic.slots.length,
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
}: GenerateMockBoostersProps = {}): App.PlayBooster[] => {
    count =
        count !== undefined && count !== null
            ? count
            : boosterProps.length || getRandomNumber(1, 5);

    return Array.from({ length: count }).map((_, i) =>
        generateMockBooster(boosterProps[i] || {})
    );
};

type GenerateMockCardProps = {
    binderName?: ManaBox.Card["binderName"];
    binderType?: ManaBox.Card["binderType"];
    collectorNumber?: ManaBox.Card["collectorNumber"];
    foil?: ManaBox.Card["foil"];
    language?: ManaBox.Card["language"];
    name?: ManaBox.Card["name"];
    purchasePriceCurrency?: ManaBox.Card["purchasePriceCurrency"];
    quantity?: ManaBox.Card["quantity"];
    rarity?: ManaBox.Card["rarity"];
    setCode?: ManaBox.Card["setCode"];
    setName?: ManaBox.Card["setName"];
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
}: GenerateMockCardProps = {}): ManaBox.Card => {
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
}: GenerateMockCardsProps = {}): ManaBox.Card[] => {
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
}: GenerateMockLibraryProps = {}): ManaBox.Card[] => {
    const defaultSet = {
        setCode: "ABC",
        commonCardCount: 25,
        uncommonCardCount: 25,
        rareCardCount: 25,
        mythicCardCount: 25,
        commonFoilCardCount: 25,
        uncommonFoilCardCount: 25,
        rareFoilCardCount: 25,
        mythicFoilCardCount: 25,
        basicLandCardCount: 25,
        basicLandFoilCardCount: 25,
    };

    const setsToGenerate = sets || [{ ...defaultSet }];

    const generatedCards = setsToGenerate.map(
        ({
            setCode,
            commonCardCount = 25,
            uncommonCardCount = 25,
            rareCardCount = 25,
            mythicCardCount = 25,
            commonFoilCardCount = 25,
            uncommonFoilCardCount = 25,
            rareFoilCardCount = 25,
            mythicFoilCardCount = 25,
            basicLandCardCount = 25,
            basicLandFoilCardCount = 25,
        }) => {
            return {
                common: generateMockCards({
                    cardProps: Array(commonCardCount)
                        .fill({
                            foil: "normal",
                            quantity: 1,
                            rarity: "common",
                            setCode,
                        })
                        .map((card, index) => ({
                            ...card,
                            name: `Mock Common Card ${index + 1}`,
                        })),
                }),
                uncommon: generateMockCards({
                    cardProps: Array(uncommonCardCount)
                        .fill({
                            foil: "normal",
                            quantity: 1,
                            rarity: "uncommon",
                            setCode,
                        })
                        .map((card, index) => ({
                            ...card,
                            name: `Mock Uncommon Card ${index + 1}`,
                        })),
                }),
                rare: generateMockCards({
                    cardProps: Array(rareCardCount)
                        .fill({
                            foil: "normal",
                            quantity: 1,
                            rarity: "rare",
                            setCode,
                        })
                        .map((card, index) => ({
                            ...card,
                            name: `Mock Rare Card ${index + 1}`,
                        })),
                }),
                mythic: generateMockCards({
                    cardProps: Array(mythicCardCount)
                        .fill({
                            foil: "normal",
                            quantity: 1,
                            rarity: "mythic",
                            setCode,
                        })
                        .map((card, index) => ({
                            ...card,
                            name: `Mock Mythic Card ${index + 1}`,
                        })),
                }),
                commonFoil: generateMockCards({
                    cardProps: Array(commonFoilCardCount)
                        .fill({
                            foil: "foil",
                            quantity: 1,
                            rarity: "common",
                            setCode,
                        })
                        .map((card, index) => ({
                            ...card,
                            name: `Mock Common Foil Card ${index + 1}`,
                        })),
                }),
                uncommonFoil: generateMockCards({
                    cardProps: Array(uncommonFoilCardCount)
                        .fill({
                            foil: "foil",
                            quantity: 1,
                            rarity: "uncommon",
                            setCode,
                        })
                        .map((card, index) => ({
                            ...card,
                            name: `Mock Uncommon Foil Card ${index + 1}`,
                        })),
                }),
                rareFoil: generateMockCards({
                    cardProps: Array(rareFoilCardCount)
                        .fill({
                            foil: "foil",
                            quantity: 1,
                            rarity: "rare",
                            setCode,
                        })
                        .map((card, index) => ({
                            ...card,
                            name: `Mock Rare Foil Card ${index + 1}`,
                        })),
                }),
                mythicFoil: generateMockCards({
                    cardProps: Array(mythicFoilCardCount)
                        .fill({
                            foil: "foil",
                            quantity: 1,
                            rarity: "mythic",
                            setCode,
                        })
                        .map((card, index) => ({
                            ...card,
                            name: `Mythic Foil Card ${index + 1}`,
                        })),
                }),
                basicLand: generateMockCards({
                    cardProps: Array(basicLandCardCount)
                        .fill({
                            foil: "normal",
                            quantity: 1,
                            rarity: "common",
                            setCode,
                        })
                        .map((card, index) => ({
                            ...card,
                            name: MTG.BASIC_LAND_NAMES[index % 5],
                        })),
                }),
                basicLandFoil: generateMockCards({
                    cardProps: Array(basicLandFoilCardCount)
                        .fill({
                            foil: "foil",
                            quantity: 1,
                            rarity: "common",
                            setCode,
                        })
                        .map((card, index) => ({
                            ...card,
                            name: MTG.BASIC_LAND_NAMES[index % 5],
                        })),
                }),
            };
        }
    );

    return generatedCards.reduce(
        (acc: ManaBox.Card[], set) =>
            acc.concat(
                set.common,
                set.uncommon,
                set.rare,
                set.mythic,
                set.commonFoil,
                set.uncommonFoil,
                set.rareFoil,
                set.mythicFoil,
                set.basicLand,
                set.basicLandFoil
            ),
        [] as ManaBox.Card[]
    );
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
export const getRandomBinderType = (): ManaBox.Card["binderType"] => {
    const binderTypes: ManaBox.Card["binderType"][] = [
        "binder",
        "deck",
        "list",
    ];

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
}: GetRandomConditionProps = {}): ManaBox.Card["condition"] => {
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
            return condition as ManaBox.Card["condition"];
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
}: GetRandomFoilProps = {}): ManaBox.Card["foil"] => {
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
}: GetRandomRarityProps = {}): ManaBox.Card["rarity"] => {
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
