import { MTG, PLAY_BOOSTER_RULES } from "@/constants";
import {
    FULL_ART_BASIC_LANDS_BLB,
    NONBASIC_LANDS_BLB,
} from "@/constants/play-booster-rules/blb";

import { generateBoosters } from "@/utils";
import { generateMockCards, generateMockLibrary } from "@/utils/test-utils";

const theListCards = generateMockCards({
    cardProps: MTG.THE_LIST.blb,
});

const blbCards = [
    ...generateMockLibrary({ sets: [{ setCode: "blb" }] }),
    ...generateMockCards({
        cardProps: [
            ...FULL_ART_BASIC_LANDS_BLB.autumn,
            ...FULL_ART_BASIC_LANDS_BLB.autumn,
            ...FULL_ART_BASIC_LANDS_BLB.spring,
            ...FULL_ART_BASIC_LANDS_BLB.spring,
            ...FULL_ART_BASIC_LANDS_BLB.summer,
            ...FULL_ART_BASIC_LANDS_BLB.summer,
            ...FULL_ART_BASIC_LANDS_BLB.winter,
            ...FULL_ART_BASIC_LANDS_BLB.winter,
        ],
    }),
    ...generateMockCards({
        cardProps: [
            ...NONBASIC_LANDS_BLB.common,
            ...NONBASIC_LANDS_BLB.common,
            ...NONBASIC_LANDS_BLB.uncommon,
            ...NONBASIC_LANDS_BLB.uncommon,
            ...NONBASIC_LANDS_BLB.rare,
            ...NONBASIC_LANDS_BLB.rare,
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
        for (const booster of boosters.boosters) {
            expect(booster.cards.length).toBe(
                PLAY_BOOSTER_RULES.generic.slots.length
            );
        }
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
                        commonFoilCardCount: 1 * boosterCount,
                        uncommonFoilCardCount: 1 * boosterCount,
                        rareFoilCardCount: 1 * boosterCount,
                        mythicFoilCardCount: 1 * boosterCount,
                        basicLandCardCount: 1 * boosterCount,
                        basicLandFoilCardCount: 1 * boosterCount,
                    },
                ],
            }),
        });

        for (const booster of boosters.boosters) {
            const cardIds = booster.cards.map((card) => card.collectorNumber);
            const uniqueCardIds = new Set(cardIds);
            expect(uniqueCardIds.size).toBe(cardIds.length);
        }
    });
});
