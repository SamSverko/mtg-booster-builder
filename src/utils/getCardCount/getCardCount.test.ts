import { getCardCount } from "@/utils";
import { generateMockCards } from "@/utils/test-utils";

describe("getCardCount", () => {
    it("should return 0 when the cards array is empty", () => {
        expect(getCardCount([])).toBe(0);
    });

    it("should return the correct total when there is one card", () => {
        const cards = generateMockCards({
            cardProps: [{ quantity: 3 }],
        });

        expect(getCardCount(cards)).toBe(3);
    });

    it("should return the correct total when there are multiple cards", () => {
        const cards = generateMockCards({
            cardProps: [{ quantity: 3 }, { quantity: 4 }],
        });

        expect(getCardCount(cards)).toBe(7);
    });

    it("should handle cards with a quantity of 0", () => {
        const cards = generateMockCards({
            cardProps: [{ quantity: 3 }, { quantity: 0 }],
        });

        expect(getCardCount(cards)).toBe(3);
    });

    it("should return 0 when all cards have a quantity of 0", () => {
        const cards = generateMockCards({
            cardProps: [{ quantity: 0 }, { quantity: 0 }],
        });

        expect(getCardCount(cards)).toBe(0);
    });

    it("should throw an error if any card has a negative quantity", () => {
        const cards = generateMockCards({
            cardProps: [{ quantity: -1 }],
        });

        expect(() => getCardCount(cards)).toThrow();
    });
});
