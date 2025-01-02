import { PLAY_BOOSTER_RULE } from "@/constants";
import { generateBoosters } from "@/utils";
import { generateMockLibrary } from "@/utils/test-utils";

describe("generateBoosters", () => {
    const setCode1 = "ABC";
    const setCode2 = "DEF";

    const singleSetLibrary = generateMockLibrary({
        sets: [{ setCode: setCode1 }],
    });

    const multiSetLibrary = generateMockLibrary({
        sets: [{ setCode: setCode1 }, { setCode: setCode2 }],
    });

    const insufficentCardCountLibrary = generateMockLibrary({
        sets: [
            {
                setCode: setCode1,
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

    it("should generate boosters without errors", () => {
        const boosters = generateBoosters({
            allocatedBoosterCountBySetCode: {
                [setCode1]: 2,
            },
            cards: singleSetLibrary,
        });

        expect(boosters.errors).toEqual([]);

        expect(boosters.boosters.length).toBe(2);
        boosters.boosters.forEach((booster) => {
            expect(booster.cards.length).toBe(PLAY_BOOSTER_RULE.slots.length);
        });
    });

    it("should return an error if no cards are provided", () => {
        const boosters = generateBoosters({
            allocatedBoosterCountBySetCode: { [setCode1]: 1 },
            cards: [],
        });

        expect(boosters.errors).toContain("No cards provided.");
        expect(boosters.boosters.length).toBe(0);
    });

    it("should return an error if no cards match the set codes", () => {
        const boosters = generateBoosters({
            allocatedBoosterCountBySetCode: { [setCode2]: 1 },
            cards: singleSetLibrary,
        });

        expect(boosters.errors).toContain(
            "No cards matching any allocated set codes found."
        );
        expect(boosters.boosters.length).toBe(0);
    });

    it("should handle the case where no boosters are allocated", () => {
        const boosters = generateBoosters({
            allocatedBoosterCountBySetCode: { [setCode1]: 0 },
            cards: singleSetLibrary,
        });

        expect(boosters.errors).toContain(
            "Skipping ABC as allocated booster count is 0 or less."
        );
        expect(boosters.boosters.length).toBe(0);
    });

    it("should return an error if there are not enough cards available for a booster slot", () => {
        const boosters = generateBoosters({
            allocatedBoosterCountBySetCode: { [setCode1]: 1 },
            cards: insufficentCardCountLibrary,
        });

        expect(boosters.errors[0]).toContain(
            "No available cards found for slot"
        );
        expect(boosters.boosters.length).toBe(1);
    });

    it("should generate boosters for multiple set codes", () => {
        const boosters = generateBoosters({
            allocatedBoosterCountBySetCode: { [setCode1]: 2, [setCode2]: 1 },
            cards: multiSetLibrary,
        });

        expect(boosters.errors).toEqual([]);
        expect(boosters.boosters.length).toBe(3);
    });

    it("each booster should not contain duplicate cards", () => {
        const boosterCount = 2;
        const boosters = generateBoosters({
            allocatedBoosterCountBySetCode: { [setCode1]: boosterCount },
            cards: generateMockLibrary({
                sets: [
                    {
                        setCode: setCode1,
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

    it("should ensure that all cards in a GENERIC booster match their respective rule slot", () => {
        const boosterCount = 2;
        const boosters = generateBoosters({
            allocatedBoosterCountBySetCode: { [setCode1]: boosterCount },
            cards: generateMockLibrary({
                sets: [
                    {
                        setCode: setCode1,
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
            booster.cards.forEach((card, index) => {
                const selectedSlot = PLAY_BOOSTER_RULE.slots[index];

                // Check if the card matches at least one configuration in the selected slot
                const matchFound = selectedSlot.some(
                    (slotConfig) =>
                        slotConfig.rarity === card.rarity &&
                        slotConfig.foil === card.foil
                );

                expect(matchFound).toBe(true);
                expect(card.setCode).toBe(setCode1);
            });
        });
    });
});
