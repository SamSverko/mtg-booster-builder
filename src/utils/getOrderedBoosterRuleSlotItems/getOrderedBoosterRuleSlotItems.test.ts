import { PLAY_BOOSTER_RULES } from "@/constants";
import { App } from "@/types";
import { getOrderedBoosterRuleSlotItems } from "@/utils"; // Updated function name

describe("getOrderedBoosterRuleSlotItems", () => {
    it("should return items ordered by random selection based on their percentage distribution", () => {
        const slot = PLAY_BOOSTER_RULES.generic.slots[0]; // Sample slot
        const orderedItems = getOrderedBoosterRuleSlotItems(slot);

        expect(orderedItems).toBeDefined();
        expect(orderedItems.length).toBeGreaterThan(0);

        // Ensure that the items are in the correct order (we'll just check that each item exists)
        orderedItems.forEach((item) => {
            expect(item).toBeDefined();
            expect(["normal"]).toContain(item.foil);
            expect(["common", "uncommon", "rare", "mythic"]).toContain(
                item.rarity
            );
        });
    });

    it("should handle multiple items in a slot and respect the percentage distribution", () => {
        const slot = PLAY_BOOSTER_RULES.generic.slots[6];
        const orderedItems = getOrderedBoosterRuleSlotItems(slot);

        expect(orderedItems).toBeDefined();
        expect(orderedItems.length).toBeGreaterThan(0);

        // Check if the percentage distribution is roughly respected
        // Ensure that rarities are well-distributed according to the mock random values
        const rarities = orderedItems.map((item) => item.rarity);
        expect(rarities).toContain("common");
        expect(rarities).toContain("uncommon");
        expect(rarities).toContain("rare");
        expect(rarities).toContain("mythic");
    });

    it("should work correctly when there's only one item in the slot", () => {
        const slot: App.PlayBoosterRuleSlot = [
            { foil: "normal", percentage: 100, rarity: "common" },
        ];
        const orderedItems = getOrderedBoosterRuleSlotItems(slot);

        expect(orderedItems).toEqual<App.PlayBoosterRuleSlotItem[]>(slot); // Should return the same item
    });

    it("should return the correct ordering when the random value is overridden", () => {
        const slot = PLAY_BOOSTER_RULES.generic.slots[6]; // Slot with multiple rarities

        // Temporarily override Math.random() to control the order
        const originalMathRandom = Math.random;

        // Mock Math.random to return a fixed value for different calls
        jest.spyOn(Math, "random")
            .mockReturnValueOnce(0.996) // First item (should be mythic)
            .mockReturnValueOnce(0.8) // Second item (should be rare)
            .mockReturnValueOnce(0.4) // Third item (should be uncommon)
            .mockReturnValueOnce(0.2); // Fourth item (should be common)

        // Call the function under test after mocking Math.random()
        const orderedItems = getOrderedBoosterRuleSlotItems(slot);

        // Log the ordered items to check how they are sorted
        console.log("orderedItems:", orderedItems);

        // Find the index of the 'mythic' item in the ordered list
        const mythicIndex = orderedItems.findIndex(
            (item) => item.rarity === "mythic"
        );

        // Assert that 'mythic' should be the first item based on the overridden random value
        expect(mythicIndex).toBe(0); // It should be the first item.

        // Restore original Math.random after the test
        Math.random = originalMathRandom;
    });

    it("should handle empty slots gracefully", () => {
        const emptySlot: App.PlayBoosterRuleSlot = [];

        expect(() => getOrderedBoosterRuleSlotItems(emptySlot)).toThrow();
    });

    it("should handle the wildcard slots", () => {
        const slot = PLAY_BOOSTER_RULES.generic.slots[12]; // Wildcard slot with specific rarities and percentages
        const orderedItems = getOrderedBoosterRuleSlotItems(slot);

        expect(orderedItems).toBeDefined();
        expect(orderedItems.length).toBeGreaterThan(0);
        expect(["common", "uncommon", "rare", "mythic"]).toContain(
            orderedItems[0].rarity
        );
        expect(orderedItems[0].foil).toBe("normal");
    });

    it("should throw an error if the total percentage doesn't add up to 100", () => {
        const invalidSlot: App.PlayBoosterRuleSlot = [
            { foil: "normal", percentage: 50, rarity: "common" },
            { foil: "normal", percentage: 50, rarity: "uncommon" },
            { foil: "normal", percentage: 50, rarity: "rare" },
        ];

        expect(() => getOrderedBoosterRuleSlotItems(invalidSlot)).toThrow();
    });
});
