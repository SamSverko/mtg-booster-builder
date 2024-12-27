import { getCardCountBySetCode } from "@/utils";
import { generateMockCards } from "@/utils/test-utils";

describe("getCardCountBySetCode", () => {
    it("should return an empty object for an empty array", () => {
        const result = getCardCountBySetCode([]);
        expect(result).toEqual({});
    });

    it("should return correct card counts by set code", () => {
        const cards = generateMockCards({
            count: 3,
            cardProps: [
                { setCode: "SET1", quantity: 2 },
                { setCode: "SET2", quantity: 3 },
                { setCode: "SET1", quantity: 1 },
            ],
        });
        const result = getCardCountBySetCode(cards);
        expect(result).toEqual({ SET1: 3, SET2: 3 });
    });

    it("should sum quantities for the same set code", () => {
        const cards = generateMockCards({
            count: 2,
            cardProps: [
                { setCode: "SET1", quantity: 5 },
                { setCode: "SET1", quantity: 7 },
            ],
        });
        const result = getCardCountBySetCode(cards);
        expect(result).toEqual({ SET1: 12 });
    });

    it("should sort by quantity in descending order", () => {
        const cards = generateMockCards({
            count: 3,
            cardProps: [
                { setCode: "SET1", quantity: 5 },
                { setCode: "SET2", quantity: 3 },
                { setCode: "SET3", quantity: 7 },
            ],
        });
        const result = getCardCountBySetCode(cards);
        expect(result).toEqual({ SET3: 7, SET1: 5, SET2: 3 });
    });

    it("should handle cards with zero quantities correctly", () => {
        const cards = generateMockCards({
            count: 2,
            cardProps: [
                { setCode: "SET1", quantity: 0 },
                { setCode: "SET2", quantity: 5 },
            ],
        });
        const result = getCardCountBySetCode(cards);
        expect(result).toEqual({ SET2: 5, SET1: 0 });
    });

    it("should handle multiple cards with the same setCode and negative quantities", () => {
        const cards = generateMockCards({
            count: 2,
            cardProps: [
                { setCode: "SET1", quantity: -3 },
                { setCode: "SET1", quantity: 5 },
            ],
        });
        const result = getCardCountBySetCode(cards);
        expect(result).toEqual({ SET1: 2 });
    });
});