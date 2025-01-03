import { RARITY_ORDER } from "@/constants";
import { type CardRarity } from "@/types";
import { compareRarityOrder } from "@/utils";

describe("compareRarityOrder", () => {
    it("should return a negative number when the first rarity is less than the second", () => {
        expect(compareRarityOrder("common", "uncommon")).toBeLessThan(0);
        expect(compareRarityOrder("uncommon", "rare")).toBeLessThan(0);
        expect(compareRarityOrder("rare", "mythic")).toBeLessThan(0);
    });

    it("should return a positive number when the first rarity is greater than the second", () => {
        expect(compareRarityOrder("uncommon", "common")).toBeGreaterThan(0);
        expect(compareRarityOrder("rare", "uncommon")).toBeGreaterThan(0);
        expect(compareRarityOrder("mythic", "rare")).toBeGreaterThan(0);
    });

    it("should return 0 when the rarities are the same", () => {
        expect(compareRarityOrder("common", "common")).toBe(0);
        expect(compareRarityOrder("uncommon", "uncommon")).toBe(0);
        expect(compareRarityOrder("rare", "rare")).toBe(0);
        expect(compareRarityOrder("mythic", "mythic")).toBe(0);
    });

    it("should throw an error if an invalid rarity is passed", () => {
        const invalidRarity = "invalidRarity" as CardRarity;

        expect(() => compareRarityOrder(invalidRarity, "common")).toThrow();
        expect(() => compareRarityOrder("common", invalidRarity)).toThrow();
    });

    it("should correctly use the RARITY_ORDER mapping for comparison", () => {
        Object.entries(RARITY_ORDER).forEach(([rarity, order]) => {
            const otherOrder = RARITY_ORDER[rarity as CardRarity];

            expect(
                compareRarityOrder(rarity as CardRarity, rarity as CardRarity)
            ).toBe(order - otherOrder);
        });
    });
});
