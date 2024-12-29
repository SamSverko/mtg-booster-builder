import { App } from "@/types";

/**
 * Get a random item from a Play Booster Rule Slot based on its percentage distribution.
 */
export const getBoosterRuleSlotItem = (
    slot: App.PlayBoosterRuleSlot
): App.PlayBoosterRuleSlotItem => {
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

    const random = Math.random() * totalPercentage;

    let cumulativePercentage = 0;

    for (const item of slot) {
        cumulativePercentage += item.percentage;
        if (random <= cumulativePercentage) {
            return item;
        }
    }

    return slot[slot.length - 1]; // Return the last item if no match
};
