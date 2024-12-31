import { PLAY_BOOSTER_RULES } from "@/constants";
import { FULL_ART_BASIC_LANDS_BLB } from "@/constants/play-booster-rules/blb";
import { getBoosterRuleSlotItemCards, getCardsMap } from "@/utils";
import { generateMockCard, generateMockCards } from "@/utils/test-utils";

describe("getBoosterRuleSlotItemCards", () => {
    it("should return only common cards for a simple common slot", () => {
        const selectedSlot = PLAY_BOOSTER_RULES.blb.slots[0][0]; // First common slot

        const commonCards = generateMockCards({
            cardProps: Array(5)
                .fill({
                    foil: "normal",
                    quantity: 1,
                    rarity: "common",
                })
                .map((card, index) => ({
                    ...card,
                    collectorNumber: index + 1,
                })),
            count: 5,
        });

        const uncommonCards = generateMockCards({
            cardProps: Array(5)
                .fill({
                    foil: "normal",
                    quantity: 1,
                    rarity: "uncommon",
                })
                .map((card, index) => ({
                    ...card,
                    collectorNumber: index + 10,
                })),
            count: 5,
        });

        const totalCards = [...commonCards, ...uncommonCards];
        const availableCardsMap = getCardsMap(totalCards);

        const result = getBoosterRuleSlotItemCards({
            availableCardsMap,
            selectedSlot,
        });

        expect(result.length).toBe(commonCards.length);
        expect(result.every((card) => card.rarity === "common")).toBeTruthy();
    });

    it("should exclude cards from the deny list", () => {
        const selectedSlot = PLAY_BOOSTER_RULES.blb.slots[0][0]; // First common slot

        const deniedCards = (selectedSlot.denyList || []).map((card) =>
            generateMockCard({
                ...card,
                foil: "normal",
                quantity: 1,
                rarity: "common",
            })
        );

        const commonCards = generateMockCards({
            cardProps: Array(5)
                .fill({
                    foil: "normal",
                    quantity: 1,
                    rarity: "common",
                })
                .map((card, index) => ({
                    ...card,
                    collectorNumber: index + 1,
                })),
            count: 5,
        });

        const totalCards = [...commonCards, ...deniedCards];
        const availableCardsMap = getCardsMap(totalCards);

        const result = getBoosterRuleSlotItemCards({
            availableCardsMap,
            selectedSlot,
        });

        expect(result.length).toBe(commonCards.length);
        expect(
            result.every(
                (card) =>
                    !deniedCards.some(
                        (denied) =>
                            denied.collectorNumber === card.collectorNumber
                    )
            )
        ).toBeTruthy();
    });

    it("should include only cards from the allow list", () => {
        const selectedSlot = PLAY_BOOSTER_RULES.blb.slots[13][0]; // Seasonal full-art basic lands (spring, normal)

        const allowedCards = (selectedSlot.allowList || []).map((card) =>
            generateMockCard({
                ...card,
                foil: "normal",
                quantity: 1,
                rarity: "common",
            })
        );

        const otherSeasonCards = FULL_ART_BASIC_LANDS_BLB.summer.map((card) =>
            generateMockCard({
                ...card,
                foil: "normal",
                quantity: 1,
                rarity: "common",
            })
        );

        const totalCards = [...allowedCards, ...otherSeasonCards];
        const availableCardsMap = getCardsMap(totalCards);

        const result = getBoosterRuleSlotItemCards({
            availableCardsMap,
            selectedSlot,
        });

        expect(result.length).toBe(allowedCards.length);
        expect(
            result.every((card) =>
                allowedCards.some(
                    (allowed) =>
                        allowed.collectorNumber === card.collectorNumber
                )
            )
        ).toBeTruthy();
    });

    it("should handle foil cards correctly in a traditional foil slot", () => {
        const selectedSlot = PLAY_BOOSTER_RULES.blb.slots[12][0]; // Traditional foil slot

        const commonFoilCards = generateMockCards({
            cardProps: Array(5)
                .fill({
                    foil: "foil",
                    quantity: 1,
                    rarity: "common",
                })
                .map((card, index) => ({
                    ...card,
                    collectorNumber: index + 1,
                })),
            count: 5,
        });

        const uncommonFoilCards = generateMockCards({
            cardProps: Array(5)
                .fill({
                    foil: "foil",
                    quantity: 1,
                    rarity: "uncommon",
                })
                .map((card, index) => ({
                    ...card,
                    collectorNumber: index + 10,
                })),
            count: 5,
        });

        const totalCards = [...commonFoilCards, ...uncommonFoilCards];
        const availableCardsMap = getCardsMap(totalCards);

        const result = getBoosterRuleSlotItemCards({
            availableCardsMap,
            selectedSlot,
        });

        expect(result.every((card) => card.foil === "foil")).toBeTruthy();
    });
});
