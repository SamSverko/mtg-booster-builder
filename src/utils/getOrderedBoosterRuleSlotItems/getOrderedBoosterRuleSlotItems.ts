import {
    type PlayBoosterRuleSlot,
    type PlayBoosterRuleSlotItem,
} from "@/types";

/**
 * Get all items from a Play Booster Rule Slot, ordered by their random selection.
 */
export const getOrderedBoosterRuleSlotItems = (
    slot: PlayBoosterRuleSlot
): PlayBoosterRuleSlotItem[] => {
    if (slot.length === 0) {
        throw new Error("Slot is empty");
    }

    const totalPercentage = slot.reduce(
        (total, item) => total + item.percentage,
        0
    );

    if (totalPercentage !== 100) {
        throw new Error(
            `Total percentage of the slot must equal 100%. Current total: ${totalPercentage}`
        );
    }

    // Generate random values for each item, weighted by their percentage
    const weightedItems = slot.map((item) => {
        const random = Math.random() * 100; // Random number between 0 and 100, unique for each item
        return { item, random };
    });

    // Sort items by their random selection (ascending order)
    weightedItems.sort((a, b) => a.random - b.random);

    // Return the sorted items
    return weightedItems.map((entry) => entry.item);
};
