import { MTG } from "@/constants";
import { App } from "@/types";
import { getBoosterRuleSlotItem } from "@/utils";

describe("getBoosterRuleSlotItem", () => {
    it("should return a valid item from a simple slot", () => {
        const slot = MTG.PLAY_BOOSTER_RULE.slots[0];
        const item = getBoosterRuleSlotItem(slot);

        expect(item).toBeDefined();
        expect(item.foil).toBe("normal");
        expect(item.percentage).toBe(100);
        expect(item.rarity).toBe("common");
    });

    it("should handle multiple items in a slot and respect the percentage distribution", () => {
        const slot = MTG.PLAY_BOOSTER_RULE.slots[6];
        const item = getBoosterRuleSlotItem(slot);

        expect(item).toBeDefined();
        expect(["common", "uncommon", "rare", "mythic"]).toContain(item.rarity);
        expect(["normal"]).toContain(item.foil);
    });

    it("should work correctly when there's only one item in the slot", () => {
        const slot: App.PlayBoosterRuleSlot = [
            { foil: "normal", percentage: 100, rarity: "common" },
        ];
        const item = getBoosterRuleSlotItem(slot);

        expect(item).toEqual<App.PlayBoosterRuleSlotItem>(slot[0]);
    });

    it("should return a rare or mythic item when the mocked random value targets that range", () => {
        const slot = MTG.PLAY_BOOSTER_RULE.slots[6]; // Slot with multiple rarities

        // Temporarily override Math.random() to return a value that will result in 'mythic' rarity selection
        const originalMathRandom = Math.random;
        Math.random = () => 0.996; // Mocking Math.random to return a value in the range of 'mythic'

        const item = getBoosterRuleSlotItem(slot);

        // Since we mocked Math.random() to return 0.996, we expect 'mythic' rarity to be selected
        expect(item.rarity).toBe("mythic");

        // Restore original Math.random after the test
        Math.random = originalMathRandom;
    });

    it("should handle empty slots gracefully", () => {
        const emptySlot: App.PlayBoosterRuleSlot = [];

        expect(() => getBoosterRuleSlotItem(emptySlot)).toThrow();
    });

    it("should handle the wildcard slots", () => {
        const slot = MTG.PLAY_BOOSTER_RULE.slots[12]; // Wildcard slot with specific rarities and percentages
        const item = getBoosterRuleSlotItem(slot);

        expect(item).toBeDefined();
        expect(["common", "uncommon", "rare", "mythic"]).toContain(item.rarity);
        expect(item.foil).toBe("normal");
    });

    it("should throw an error if the total percentage doesn't add up to 100", () => {
        const invalidSlot: App.PlayBoosterRuleSlot = [
            { foil: "normal", percentage: 50, rarity: "common" },
            { foil: "normal", percentage: 50, rarity: "uncommon" },
            { foil: "normal", percentage: 50, rarity: "rare" },
        ];

        expect(() => getBoosterRuleSlotItem(invalidSlot)).toThrow();
    });
});
