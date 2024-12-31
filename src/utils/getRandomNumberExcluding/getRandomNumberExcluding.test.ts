import { getRandomNumberExcluding } from "@/utils";

describe("getRandomNumberExcluding", () => {
    it("should return a random number within the specified range", () => {
        const result = getRandomNumberExcluding([], 1, 10);

        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(10);
    });

    it("should exclude the numbers in the excludedNumbers array", () => {
        const excluded = [3, 5, 7];
        const result = getRandomNumberExcluding(excluded, 1, 10);

        expect(excluded.includes(result)).toBe(false);
    });

    it("should return a number even if the excludedNumbers array has multiple elements", () => {
        const excluded = [1, 2, 3, 4, 5];
        const result = getRandomNumberExcluding(excluded, 1, 5);

        expect(excluded.includes(result)).toBe(false);
    });

    it("should work with the default min and max values", () => {
        const excluded = [1, 2, 3, 4, 5];
        const result = getRandomNumberExcluding(excluded);

        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(300);
        expect(excluded.includes(result)).toBe(false);
    });

    it("should return a number within the custom range even when the min and max are changed", () => {
        const excluded = [10, 15, 20];
        const result = getRandomNumberExcluding(excluded, 10, 30);

        expect(result).toBeGreaterThanOrEqual(10);
        expect(result).toBeLessThanOrEqual(30);
        expect(excluded.includes(result)).toBe(false);
    });

    it("should not return a number from the excluded array if all numbers in range are excluded", () => {
        const excluded = [3, 4, 5];
        const result = getRandomNumberExcluding(excluded, 3, 5);

        expect([3, 4, 5].includes(result)).toBe(false);
    });

    it("should return a random number if no numbers are excluded", () => {
        const result = getRandomNumberExcluding([]);

        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(300);
    });

    it("should ensure uniqueness in the excluded numbers array", () => {
        const excluded = [5, 5, 5, 5]; // Array with duplicate numbers
        const result = getRandomNumberExcluding(excluded, 1, 10);

        expect(result).not.toBe(5); // Ensure 5 is excluded despite duplicates
    });
});
