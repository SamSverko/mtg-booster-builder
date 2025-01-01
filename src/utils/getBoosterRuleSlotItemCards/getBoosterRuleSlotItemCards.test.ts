import {
    BASIC_LANDS_FULL_ART_BLB,
    BASIC_LAND_NAMES,
    PLAY_BOOSTER_RULE,
    PLAY_BOOSTER_RULE_BLB,
} from "@/constants";
import {
    getBoosterRuleSlotItemCards,
    getCardsMap,
    getRandomNumberExcluding,
} from "@/utils";
import { generateMockCard, generateMockCards } from "@/utils/test-utils";

describe("getBoosterRuleSlotItemCards", () => {
    it("should return only common cards for a simple common slot", () => {
        const setCode = "BLB";
        const selectedSlot = PLAY_BOOSTER_RULE_BLB.slots[0][0]; // First common slot

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
                setCode,
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
                setCode,
            }),
        });

        const totalCards = [...commonCards, ...uncommonCards];
        const availableCardsMap = getCardsMap(totalCards);

        const result = getBoosterRuleSlotItemCards({
            availableCardsMap,
            selectedSlot,
            setCode,
        });

        expect(result.length).toBe(commonCards.length);
        expect(result.every((card) => card.rarity === "common")).toBeTruthy();
    });

    it("should return only cards that match the setCode", () => {
        const setCode = "BLB";
        const selectedSlot = PLAY_BOOSTER_RULE_BLB.slots[0][0];

        // Create some mock cards with different setCodes
        const matchingCards = generateMockCards({
            cardProps: Array(5).fill({
                collectorNumber: getRandomNumberExcluding([], 1, 100),
                foil: "normal",
                quantity: 1,
                rarity: "common",
                setCode: setCode,
            }),
        });

        const otherSetCards = generateMockCards({
            cardProps: Array(5).fill({
                collectorNumber: getRandomNumberExcluding([], 101, 200),
                foil: "normal",
                quantity: 1,
                rarity: "common",
                setCode: "ABC",
            }),
        });

        const totalCards = [...matchingCards, ...otherSetCards];
        const availableCardsMap = getCardsMap(totalCards);

        const result = getBoosterRuleSlotItemCards({
            availableCardsMap,
            selectedSlot,
            setCode,
        });

        // Ensure that every card in the result matches the expected setCode
        expect(result.every((card) => card.setCode === setCode)).toBeTruthy();
    });

    it("should return cards matching the setCode, except for one in the allowList", () => {
        const setCode = "BLB";
        const selectedSlot = PLAY_BOOSTER_RULE_BLB.slots[0][0];

        const matchingCards = generateMockCards({
            cardProps: Array(4).fill({
                collectorNumber: getRandomNumberExcluding([], 1, 100),
                foil: "normal",
                quantity: 1,
                rarity: "common",
                setCode: setCode,
            }),
        });

        const allowListedCard = generateMockCard({
            collectorNumber: getRandomNumberExcluding([], 101, 200),
            foil: "normal",
            quantity: 1,
            rarity: "common",
            setCode: "ABC",
        });

        selectedSlot.allowList = [
            {
                collectorNumber: allowListedCard.collectorNumber,
                setCode: allowListedCard.setCode,
            },
        ];

        const totalCards = [...matchingCards, allowListedCard];
        const availableCardsMap = getCardsMap(totalCards);

        const result = getBoosterRuleSlotItemCards({
            availableCardsMap,
            selectedSlot,
            setCode,
        });

        expect(
            result.every((card) => {
                if (card.collectorNumber === allowListedCard.collectorNumber) {
                    // If the card is in the allowList, it can have a different setCode
                    return true;
                }
                return card.setCode === setCode; // Otherwise, it must match the setCode
            })
        ).toBeTruthy();

        // Clean up the allowList for the next test
        delete selectedSlot.allowList;
    });

    it("should exclude cards from the deny list", () => {
        const setCode = "BLB";
        const selectedSlot = PLAY_BOOSTER_RULE_BLB.slots[0][0]; // First common slot

        const unavailableCollectorNumbers =
            selectedSlot.denyList?.map((item) => item.collectorNumber) || [];

        const deniedCards = (selectedSlot.denyList || []).map((card) =>
            generateMockCard({
                ...card,
                foil: "normal",
                quantity: 1,
                rarity: "common",
                setCode,
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
                setCode,
            }),
        });

        const totalCards = [...commonCards, ...deniedCards];
        const availableCardsMap = getCardsMap(totalCards);

        const result = getBoosterRuleSlotItemCards({
            availableCardsMap,
            selectedSlot,
            setCode,
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
        const setCode = "BLB";
        const selectedSlot = PLAY_BOOSTER_RULE_BLB.slots[13][0]; // Seasonal full-art basic lands (spring, normal)

        const allowedCards = (selectedSlot.allowList || []).map((card) =>
            generateMockCard({
                ...card,
                foil: "normal",
                quantity: 1,
                rarity: "common",
                setCode,
            })
        );

        const otherSeasonCards = BASIC_LANDS_FULL_ART_BLB.summer.map((card) =>
            generateMockCard({
                ...card,
                foil: "normal",
                quantity: 1,
                rarity: "common",
                setCode,
            })
        );

        const totalCards = [...allowedCards, ...otherSeasonCards];
        const availableCardsMap = getCardsMap(totalCards);

        const result = getBoosterRuleSlotItemCards({
            availableCardsMap,
            selectedSlot,
            setCode,
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
        const setCode = "BLB";
        const selectedSlot = PLAY_BOOSTER_RULE_BLB.slots[12][0]; // Traditional foil slot

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
                setCode,
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
                setCode,
            }),
        });

        const totalCards = [...commonFoilCards, ...uncommonFoilCards];
        const availableCardsMap = getCardsMap(totalCards);

        const result = getBoosterRuleSlotItemCards({
            availableCardsMap,
            selectedSlot,
            setCode,
        });

        expect(result.every((card) => card.foil === "foil")).toBeTruthy();
    });

    it("should return only basic lands for a basic land slot", () => {
        const setCode = "BLB";
        const selectedSlot = PLAY_BOOSTER_RULE.slots[11][0]; // Basic Land Slot

        const basicLandCards = generateMockCards({
            cardProps: Array(5)
                .fill({
                    collectorNumber: getRandomNumberExcluding([], 1, 100),
                    foil: "normal",
                    rarity: "common",
                    superType: "basic",
                    type: "land",
                    quantity: 1,
                    setCode,
                })
                .map((card, index) => ({
                    ...card,
                    name: BASIC_LAND_NAMES[index],
                })),
        });

        const NonBasicLandCards = generateMockCards({
            cardProps: Array(5).fill({
                collectorNumber: getRandomNumberExcluding([], 101, 200),
                foil: "normal",
                quantity: 1,
                rarity: "common",
                setCode,
            }),
        });

        const totalCards = [...basicLandCards, ...NonBasicLandCards];
        const availableCardsMap = getCardsMap(totalCards);

        const result = getBoosterRuleSlotItemCards({
            availableCardsMap,
            selectedSlot,
            setCode,
        });

        // Ensure only basic lands are returned
        expect(result.length).toBe(basicLandCards.length);
        expect(
            result.every((card) => BASIC_LAND_NAMES.includes(card.name))
        ).toBeTruthy();
    });
});
