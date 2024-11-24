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
        () => value.reduce((acc, set) => acc + set.allocatedBoosters, 0),
        [value]
    );

    const resetBoosterAllocation = useCallback(() => {
        const resetValue = value.map((set) => ({
            ...set,
            allocatedBoosters: 0,
        }));
        onChange(resetValue);
    }, [value, onChange]);

    const allocateBooster = useCallback(
        (setCode: string, increment: number) => {
            console.log(
                `Allocating booster for set: ${setCode}, increment: ${increment}`
            );

            console.log("Value:", value);

            const updatedValue = value.map((set) =>
                set.setCode === setCode
                    ? {
                          ...set,
                          allocatedBoosters: set.allocatedBoosters + increment,
                      }
                    : set
            );
            console.log("Updated Value:", updatedValue);
            onChange(updatedValue);
        },
        [value, onChange]
    );

    const addAllRemainingAllocations = useCallback(
        (setCode: string) => {
            console.log(`Adding all boosters for set: ${setCode}`);
            const updatedValue = value.map((set) =>
                set.setCode === setCode
                    ? {
                          ...set,
                          allocatedBoosters: boosterCount,
                      }
                    : set
            );
            console.log("Updated Value:", updatedValue);
            onChange(updatedValue);
        },
        [value, onChange, boosterCount]
    );

    const removeAllAllocations = useCallback(
        (setCode: string) => {
            console.log(`Removing all boosters for set: ${setCode}`);
            const updatedValue = value.map((set) =>
                set.setCode === setCode
                    ? {
                          ...set,
                          allocatedBoosters: 0,
                      }
                    : set
            );
            console.log("Updated Value:", updatedValue);
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
                        return (
                            <tr key={set.setCode}>
                                <td align="left">{set.setCode}</td>
                                <td align="right">{set.count}</td>
                                <td align="center">
                                    <div className={styles.tableCellBoosters}>
                                        <button
                                            aria-label="Remove all remaining allocations"
                                            onClick={() =>
                                                removeAllAllocations(
                                                    set.setCode
                                                )
                                            }
                                            disabled={
                                                notEnoughCards ||
                                                set.allocatedBoosters === 0
                                            }
                                        >
                                            - -
                                        </button>
                                        <button
                                            aria-label="Remove one booster allocation"
                                            onClick={() =>
                                                allocateBooster(set.setCode, -1)
                                            }
                                            disabled={
                                                notEnoughCards ||
                                                set.allocatedBoosters <= 0
                                            }
                                        >
                                            -
                                        </button>
                                        <span>{set.allocatedBoosters}</span>
                                        <button
                                            aria-label="Add one booster allocation"
                                            onClick={() =>
                                                allocateBooster(set.setCode, 1)
                                            }
                                            disabled={
                                                notEnoughCards ||
                                                set.allocatedBoosters >=
                                                    boosterCount
                                            }
                                        >
                                            +
                                        </button>

                                        <button
                                            aria-label="Add all remaining allocations"
                                            onClick={() =>
                                                addAllRemainingAllocations(
                                                    set.setCode
                                                )
                                            }
                                            disabled={
                                                notEnoughCards ||
                                                set.allocatedBoosters ===
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
