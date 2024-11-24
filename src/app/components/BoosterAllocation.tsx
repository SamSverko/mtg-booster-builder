import { useCallback, useEffect, useMemo, useRef } from "react";
import { Format, SetCodeWithCardCount } from "@/app/types";
import styles from "@/app/components/BoosterAllocation.module.scss";

type SetSelectionProps = {
    boosterCount: number;
    cardCountPerSet: number;
    format: Format;
    isLoading?: boolean;
    onChange: (selectedSets: SetCodeWithCardCount[]) => void;
    playerCount: number;
    setCodesWithCardCount: SetCodeWithCardCount[];
    value: SetCodeWithCardCount[];
};

export default function BoosterAllocation({
    boosterCount,
    cardCountPerSet,
    isLoading,
    onChange,
    setCodesWithCardCount,
    value,
}: SetSelectionProps) {
    const prevBoosterCount = useRef(boosterCount);

    const totalAllocatedBoosters = useMemo(
        () => value.reduce((acc, set) => acc + set.allocatedBoosterCount, 0),
        [value]
    );

    const resetBoosterAllocation = useCallback(() => {
        onChange([]);
    }, [onChange]);

    const allocateBooster = useCallback(
        (set: SetCodeWithCardCount, increment: number) => {
            const updatedValue = value
                .map((existingSet) => {
                    if (existingSet.setCode === set.setCode) {
                        const newCount = Math.max(
                            0,
                            Math.min(
                                boosterCount,
                                existingSet.allocatedBoosterCount + increment
                            )
                        );
                        return {
                            ...existingSet,
                            allocatedBoosterCount: newCount,
                        };
                    }
                    return existingSet;
                })
                .filter((existingSet) => existingSet.allocatedBoosterCount > 0);

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

            let setExists = false;

            const updatedValue = value
                .map((existingSet) => {
                    if (existingSet.setCode === set.setCode) {
                        setExists = true;
                        return {
                            ...existingSet,
                            allocatedBoosterCount: Math.min(
                                boosterCount,
                                existingSet.allocatedBoosterCount + remaining
                            ),
                        };
                    }
                    return existingSet;
                })
                .filter((existingSet) => existingSet.allocatedBoosterCount > 0);

            if (!setExists) {
                updatedValue.push({
                    ...set,
                    allocatedBoosterCount: remaining,
                });
            }

            onChange(updatedValue);
        },
        [value, boosterCount, totalAllocatedBoosters, onChange]
    );

    const removeAllAllocations = useCallback(
        (set: SetCodeWithCardCount) => {
            const updatedValue = value
                .map((existingSet) =>
                    existingSet.setCode === set.setCode
                        ? { ...existingSet, allocatedBoosterCount: 0 }
                        : existingSet
                )
                .filter((existingSet) => existingSet.allocatedBoosterCount > 0);

            onChange(updatedValue);
        },
        [value, onChange]
    );

    useEffect(() => {
        if (prevBoosterCount.current !== boosterCount) {
            prevBoosterCount.current = boosterCount;
            onChange([]);
        }
    }, [boosterCount, onChange]);

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
                        const notEnoughCards = set.count < cardCountPerSet;
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
                                        <span
                                            className={styles.allocationCount}
                                        >
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
                <b>Note:</b> Fully disabled sets do not have enough cards for
                your settings.
            </p>
        </div>
    );
}
