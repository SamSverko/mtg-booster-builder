import { useCallback, useMemo } from "react";
import { Format, SetCodeWithCardCount } from "@/app/types";
import styles from "@/app/components/BoosterAllocation.module.scss";

type SetSelectionProps = {
    boosterCount: number;
    format: Format;
    isLoading?: boolean;
    onChange: (selectedSets: SetCodeWithCardCount[]) => void;
    playerCount: number;
    setCodesWithCardCount: SetCodeWithCardCount[];
    value: SetCodeWithCardCount[];
};

export default function BoosterAllocation({
    boosterCount,
    isLoading,
    onChange,
    setCodesWithCardCount,
    value,
}: SetSelectionProps) {
    const totalAllocatedBoosters = useMemo(
        () => value.reduce((acc, set) => acc + set.allocatedBoosterCount, 0),
        [value]
    );

    const resetBoosterAllocation = useCallback(() => {
        const resetValue = setCodesWithCardCount.map((set) => ({
            ...set,
            allocatedBoosterCount: 0,
        }));
        onChange(resetValue);
    }, [setCodesWithCardCount, onChange]);

    const allocateBooster = useCallback(
        (set: SetCodeWithCardCount, increment: number) => {
            const updatedValue = value.map((existingSet) => {
                if (existingSet.setCode === set.setCode) {
                    const newCount = Math.max(
                        0,
                        Math.min(
                            boosterCount,
                            existingSet.allocatedBoosterCount + increment
                        )
                    );
                    return { ...existingSet, allocatedBoosterCount: newCount };
                }
                return existingSet;
            });

            // Add set if it doesn't exist and increment > 0
            if (
                !updatedValue.find((s) => s.setCode === set.setCode) &&
                increment > 0
            ) {
                updatedValue.push({
                    ...set,
                    allocatedBoosterCount: increment,
                });
            }

            onChange(updatedValue);
        },
        [value, boosterCount, onChange]
    );

    const addAllRemainingAllocations = useCallback(
        (set: SetCodeWithCardCount) => {
            const remaining = boosterCount - totalAllocatedBoosters;
            if (remaining <= 0) return;

            const updatedValue = value.map((existingSet) =>
                existingSet.setCode === set.setCode
                    ? { ...existingSet, allocatedBoosterCount: boosterCount }
                    : existingSet
            );

            onChange(updatedValue);
        },
        [value, boosterCount, totalAllocatedBoosters, onChange]
    );

    const removeAllAllocations = useCallback(
        (set: SetCodeWithCardCount) => {
            const updatedValue = value.map((existingSet) =>
                existingSet.setCode === set.setCode
                    ? { ...existingSet, allocatedBoosterCount: 0 }
                    : existingSet
            );
            onChange(updatedValue);
        },
        [value, onChange]
    );

    if (isLoading) {
        return (
            <div>
                <p>Loading sets...</p>
            </div>
        );
    }

    if (!setCodesWithCardCount?.length) {
        return (
            <div>
                <p>No sets available.</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.resetSection}>
                <span>
                    <b>Boosters left to allocate:</b>{" "}
                    {boosterCount - totalAllocatedBoosters}
                </span>
                <button onClick={resetBoosterAllocation}>Reset</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <th align="left">Set</th>
                        <th align="right">Total cards</th>
                        <th>Boosters</th>
                    </tr>
                </thead>
                <tbody>
                    {setCodesWithCardCount.map((set) => {
                        const notEnoughCards = set.count < boosterCount;
                        const allocatedSet = value.find(
                            (v) => v.setCode === set.setCode
                        );

                        return (
                            <tr key={set.setCode}>
                                <td align="left">{set.setCode}</td>
                                <td align="right">{set.count}</td>
                                <td align="center">
                                    <div className={styles.tableCellBoosters}>
                                        <button
                                            aria-label="Remove all remaining allocations"
                                            onClick={() =>
                                                removeAllAllocations(set)
                                            }
                                            disabled={
                                                notEnoughCards ||
                                                (allocatedSet?.allocatedBoosterCount ??
                                                    0) === 0
                                            }
                                        >
                                            - -
                                        </button>
                                        <button
                                            aria-label="Remove one booster allocation"
                                            onClick={() =>
                                                allocateBooster(set, -1)
                                            }
                                            disabled={
                                                notEnoughCards ||
                                                (allocatedSet?.allocatedBoosterCount ??
                                                    0) <= 0
                                            }
                                        >
                                            -
                                        </button>
                                        <span>
                                            {allocatedSet?.allocatedBoosterCount ??
                                                0}
                                        </span>
                                        <button
                                            aria-label="Add one booster allocation"
                                            onClick={() =>
                                                allocateBooster(set, 1)
                                            }
                                            disabled={
                                                notEnoughCards ||
                                                totalAllocatedBoosters >=
                                                    boosterCount
                                            }
                                        >
                                            +
                                        </button>

                                        <button
                                            aria-label="Add all remaining allocations"
                                            onClick={() =>
                                                addAllRemainingAllocations(set)
                                            }
                                            disabled={
                                                notEnoughCards ||
                                                totalAllocatedBoosters >=
                                                    boosterCount
                                            }
                                        >
                                            + +
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <p>
                <b>Note:</b> Disabled sets do not have enough cards for your
                settings.
            </p>
        </div>
    );
}
