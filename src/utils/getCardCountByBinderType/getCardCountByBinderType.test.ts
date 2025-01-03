import { getCardCountByBinderType, type CardCountByBinderType } from "@/utils";
import { generateMockCards } from "@/utils/test-utils";

describe("getCardCountByBinderType", () => {
    it("should return an empty object for an empty array", () => {
        const result = getCardCountByBinderType([]);

        expect(result).toEqual<CardCountByBinderType>({});
    });

    it("should return correct card counts by binder type", () => {
        const cards = generateMockCards({
            cardProps: [
                { binderType: "deck", quantity: 2 },
                { binderType: "binder", quantity: 3 },
                { binderType: "deck", quantity: 1 },
            ],
        });
        const result = getCardCountByBinderType(cards);

        expect(result).toEqual<CardCountByBinderType>({
            binder: 3,
            deck: 3,
        });
    });

    it("should sum quantities for the same binder type", () => {
        const cards = generateMockCards({
            cardProps: [
                { binderType: "binder", quantity: 5 },
                { binderType: "binder", quantity: 7 },
            ],
        });
        const result = getCardCountByBinderType(cards);

        expect(result).toEqual<CardCountByBinderType>({ binder: 12 });
    });

    it("should sort by quantity in descending order", () => {
        const cards = generateMockCards({
            cardProps: [
                { binderType: "deck", quantity: 5 },
                { binderType: "binder", quantity: 3 },
                { binderType: "list", quantity: 7 },
            ],
        });
        const result = getCardCountByBinderType(cards);

        expect(result).toEqual<CardCountByBinderType>({
            list: 7,
            deck: 5,
            binder: 3,
        });
    });

    it("should handle cards with zero quantities correctly", () => {
        const cards = generateMockCards({
            cardProps: [
                { binderType: "binder", quantity: 0 },
                { binderType: "deck", quantity: 5 },
            ],
        });
        const result = getCardCountByBinderType(cards);

        expect(result).toEqual<CardCountByBinderType>({
            deck: 5,
            binder: 0,
        });
    });

    it("should throw an error if any card has a negative quantity", () => {
        const cards = generateMockCards({
            cardProps: [
                { binderType: "binder", quantity: -3 },
                { binderType: "binder", quantity: 5 },
            ],
        });

        expect(() => getCardCountByBinderType(cards)).toThrow();
    });
});
