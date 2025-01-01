import {
    BASIC_LANDS_FULL_ART_BLB,
    NONBASIC_LANDS_BLB,
    PLAY_BOOSTER_RULE,
    THE_LIST,
} from "@/constants";

import { generateBoosters } from "@/utils";
import { generateMockCards, generateMockLibrary } from "@/utils/test-utils";

const theListCards = generateMockCards({
    cardProps: THE_LIST.blb,
});

const blbCards = [
    ...generateMockLibrary({ sets: [{ setCode: "blb" }] }),
    ...generateMockCards({
        cardProps: [
            ...BASIC_LANDS_FULL_ART_BLB.autumn.map((card, index) => {
                return {
                    ...card,
                    foil: "normal" as const,
                    name: `Mock Full Art Basic Land Card - Autumn ${index}`,
                };
            }),
            ...BASIC_LANDS_FULL_ART_BLB.autumn.map((card, index) => {
                return {
                    ...card,
                    foil: "foil" as const,
                    name: `Mock Full Art Basic Land Foil Card - Autumn ${index}`,
                };
            }),
            ...BASIC_LANDS_FULL_ART_BLB.spring.map((card, index) => {
                return {
                    ...card,
                    foil: "normal" as const,
                    name: `Mock Full Art Basic Land Card - Spring ${index}`,
                };
            }),
            ...BASIC_LANDS_FULL_ART_BLB.spring.map((card, index) => {
                return {
                    ...card,
                    foil: "foil" as const,
                    name: `Mock Full Art Basic Land Foil Card - Spring ${index}`,
                };
            }),
            ...BASIC_LANDS_FULL_ART_BLB.summer.map((card, index) => {
                return {
                    ...card,
                    foil: "normal" as const,
                    name: `Mock Full Art Basic Land Card - Summer ${index}`,
                };
            }),
            ...BASIC_LANDS_FULL_ART_BLB.summer.map((card, index) => {
                return {
                    ...card,
                    foil: "foil" as const,
                    name: `Mock Full Art Basic Land Foil Card - Summer ${index}`,
                };
            }),
            ...BASIC_LANDS_FULL_ART_BLB.winter.map((card, index) => {
                return {
                    ...card,
                    foil: "normal" as const,
                    name: `Mock Full Art Basic Land Card - Winter ${index}`,
                };
            }),
            ...BASIC_LANDS_FULL_ART_BLB.winter.map((card, index) => {
                return {
                    ...card,
                    foil: "foil" as const,
                    name: `Mock Full Art Basic Land Foil Card - Winter ${index}`,
                };
            }),
        ],
    }),
    ...generateMockCards({
        cardProps: [
            ...NONBASIC_LANDS_BLB.common.map((card, index) => {
                return {
                    ...card,
                    foil: "normal" as const,
                    name: `Mock Common Nonbasic Land Card ${index}`,
                };
            }),
            ...NONBASIC_LANDS_BLB.common.map((card, index) => {
                return {
                    ...card,
                    foil: "foil" as const,
                    name: `Mock Common Nonbasic Land Foil Card ${index}`,
                };
            }),
            ...NONBASIC_LANDS_BLB.uncommon.map((card, index) => {
                return {
                    ...card,
                    foil: "normal" as const,
                    name: `Mock Uncommon Nonbasic Land Card ${index}`,
                };
            }),
            ...NONBASIC_LANDS_BLB.uncommon.map((card, index) => {
                return {
                    ...card,
                    foil: "normal" as const,
                    name: `Mock Uncommon Nonbasic Land Foil Card ${index}`,
                };
            }),
            ...NONBASIC_LANDS_BLB.rare.map((card, index) => {
                return {
                    ...card,
                    foil: "normal" as const,
                    name: `Mock Rare Nonbasic Land Card ${index}`,
                };
            }),
            ...NONBASIC_LANDS_BLB.rare.map((card, index) => {
                return {
                    ...card,
                    foil: "foil" as const,
                    name: `Mock Rare Nonbasic Land Foil Card ${index}`,
                };
            }),
        ],
    }),
];

const insufficentCardCountLibrary = generateMockLibrary({
    sets: [
        {
            setCode: "blb",
            commonCardCount: 1,
            uncommonCardCount: 1,
            rareCardCount: 1,
            mythicCardCount: 1,
            commonFoilCardCount: 1,
            uncommonFoilCardCount: 1,
            rareFoilCardCount: 1,
            mythicFoilCardCount: 1,
            basicLandCardCount: 1,
            basicLandFoilCardCount: 1,
        },
    ],
});

const multiSetLibrary = generateMockLibrary({
    sets: [{ setCode: "abc" }, { setCode: "def" }],
});

describe("getCardCount", () => {
    it("should generate boosters without errors", () => {
        const boosters = generateBoosters({
            allocatedBoosterCountBySetCode: {
                blb: 2,
            },
            cards: [...blbCards, ...theListCards],
        });

        expect(boosters.errors).toEqual([]);

        expect(boosters.boosters.length).toBe(2);
        boosters.boosters.forEach((booster) => {
            expect(booster.cards.length).toBe(PLAY_BOOSTER_RULE.slots.length);
        });
    });

    it("should return an error if no cards are provided", () => {
        const boosters = generateBoosters({
            allocatedBoosterCountBySetCode: { blb: 1 },
            cards: [],
        });

        expect(boosters.errors).toContain("No cards provided.");
        expect(boosters.boosters.length).toBe(0);
    });

    it("should return an error if no cards match the set codes", () => {
        const boosters = generateBoosters({
            allocatedBoosterCountBySetCode: { blb: 1 },
            cards: generateMockCards({ cardProps: [{ setCode: "xyz" }] }),
        });

        expect(boosters.errors).toContain(
            "No cards matching any allocated set codes found."
        );
        expect(boosters.boosters.length).toBe(0);
    });

    it("should handle the case where no boosters are allocated", () => {
        const boosters = generateBoosters({
            allocatedBoosterCountBySetCode: { blb: 0 },
            cards: blbCards,
        });

        expect(boosters.errors).toContain(
            "Skipping blb as allocated booster count is 0 or less."
        );
        expect(boosters.boosters.length).toBe(0);
    });

    it("should return an error if there are not enough cards available for a booster slot", () => {
        const boosters = generateBoosters({
            allocatedBoosterCountBySetCode: { blb: 1 },
            cards: insufficentCardCountLibrary,
        });

        expect(boosters.errors[0]).toContain(
            "No available cards found for slot"
        );
        expect(boosters.boosters.length).toBe(1);
    });

    it("should generate boosters for multiple set codes", () => {
        const boosters = generateBoosters({
            allocatedBoosterCountBySetCode: { abc: 2, def: 1 },
            cards: multiSetLibrary,
        });

        expect(boosters.errors).toEqual([]);
        expect(boosters.boosters.length).toBe(3);
    });

    it("each booster should not contain duplicate cards", () => {
        const boosterCount = 2;
        const boosters = generateBoosters({
            allocatedBoosterCountBySetCode: { abc: boosterCount },
            cards: generateMockLibrary({
                sets: [
                    {
                        setCode: "abc",
                        commonCardCount: 9 * boosterCount,
                        uncommonCardCount: 5 * boosterCount,
                        rareCardCount: 3 * boosterCount,
                        mythicCardCount: 3 * boosterCount,
                        commonFoilCardCount: 2 * boosterCount,
                        uncommonFoilCardCount: 2 * boosterCount,
                        rareFoilCardCount: 2 * boosterCount,
                        mythicFoilCardCount: 2 * boosterCount,
                        basicLandCardCount: 2 * boosterCount,
                        basicLandFoilCardCount: 2 * boosterCount,
                    },
                ],
            }),
        });

        boosters.boosters.forEach((booster) => {
            const cardNames = booster.cards.map((card) => card.name);
            const uniqeCardNames = new Set(cardNames);
            expect(uniqeCardNames.size).toBe(cardNames.length);
        });
    });
});
