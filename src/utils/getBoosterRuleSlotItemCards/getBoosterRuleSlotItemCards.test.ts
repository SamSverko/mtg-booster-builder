import { MTG, PLAY_BOOSTER_RULES } from "@/constants";
import { FULL_ART_BASIC_LANDS_BLB } from "@/constants/play-booster-rules/blb";
import {
    getBoosterRuleSlotItemCards,
    getCardsMap,
    getRandomNumberExcluding,
} from "@/utils";
import { generateMockCard, generateMockCards } from "@/utils/test-utils";

describe("getBoosterRuleSlotItemCards", () => {
    it("should return only common cards for a simple common slot", () => {
        const selectedSlot = PLAY_BOOSTER_RULES.blb.slots[0][0]; // First common slot

        const unavailableCollectorNumbers =
            selectedSlot.denyList?.map((item) => item.collectorNumber) || [];

        const commonCards = generateMockCards({
            cardProps: Array(5).fill({
                collectorNumber: getRandomNumberExcluding(
                    unavailableCollectorNumbers,
                    1,
                    100
                ),
                foil: "normal",
                quantity: 1,
                rarity: "common",
            }),
        });

        const uncommonCards = generateMockCards({
            cardProps: Array(5).fill({
                collectorNumber: getRandomNumberExcluding(
                    unavailableCollectorNumbers,
                    101,
                    200
                ),
                foil: "normal",
                quantity: 1,
                rarity: "uncommon",
            }),
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

        const unavailableCollectorNumbers =
            selectedSlot.denyList?.map((item) => item.collectorNumber) || [];

        const deniedCards = (selectedSlot.denyList || []).map((card) =>
            generateMockCard({
                ...card,
                foil: "normal",
                quantity: 1,
                rarity: "common",
            })
        );

        const commonCards = generateMockCards({
            cardProps: Array(5).fill({
                collectorNumber: getRandomNumberExcluding(
                    unavailableCollectorNumbers
                ),
                foil: "normal",
                quantity: 1,
                rarity: "common",
            }),
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

        const unavailableCollectorNumbers =
            selectedSlot.denyList?.map((item) => item.collectorNumber) || [];

        const commonFoilCards = generateMockCards({
            cardProps: Array(5).fill({
                collectorNumber: getRandomNumberExcluding(
                    unavailableCollectorNumbers,
                    1,
                    100
                ),
                foil: "foil",
                quantity: 1,
                rarity: "common",
            }),
        });

        const uncommonFoilCards = generateMockCards({
            cardProps: Array(5).fill({
                collectorNumber: getRandomNumberExcluding(
                    unavailableCollectorNumbers,
                    101,
                    200
                ),
                foil: "foil",
                quantity: 1,
                rarity: "uncommon",
            }),
        });

        const totalCards = [...commonFoilCards, ...uncommonFoilCards];
        const availableCardsMap = getCardsMap(totalCards);

        const result = getBoosterRuleSlotItemCards({
            availableCardsMap,
            selectedSlot,
        });

        expect(result.every((card) => card.foil === "foil")).toBeTruthy();
    });

    it("should return only basic lands for a basic land slot", () => {
        const selectedSlot = PLAY_BOOSTER_RULES.generic.slots[11][0]; // Basic Land Slot

        const basicLandCards = generateMockCards({
            cardProps: Array(5)
                .fill({
                    collectorNumber: getRandomNumberExcluding([], 1, 100),
                    foil: "normal",
                    rarity: "common",
                    superType: "basic",
                    type: "land",
                    quantity: 1,
                })
                .map((card, index) => ({
                    ...card,
                    name: MTG.BASIC_LAND_NAMES[index],
                })),
        });

        const NonBasicLandCards = generateMockCards({
            cardProps: Array(5).fill({
                collectorNumber: getRandomNumberExcluding([], 101, 200),
                foil: "normal",
                quantity: 1,
                rarity: "common",
            }),
        });

        const totalCards = [...basicLandCards, ...NonBasicLandCards];
        const availableCardsMap = getCardsMap(totalCards);

        const result = getBoosterRuleSlotItemCards({
            availableCardsMap,
            selectedSlot,
        });

        // Ensure only basic lands are returned
        expect(result.length).toBe(basicLandCards.length);
        expect(
            result.every((card) => MTG.BASIC_LAND_NAMES.includes(card.name))
        ).toBeTruthy();
    });
});
