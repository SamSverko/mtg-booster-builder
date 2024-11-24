import { useCallback, useEffect, useMemo } from "react";
import { SetSelectionListItem } from "@/app/components";
import { Format, ManaBoxCard, SetCodeWithCardCount } from "@/app/types";

import styles from "@/app/components/SetSelection.module.scss";

type SetSelectionProps = {
    boosterCount: number;
    cardCountPerSet: number;
    cards: ManaBoxCard[] | null;
    format: Format;
    isLoading?: boolean;
    onChange: (selectedSets: SetCodeWithCardCount[]) => void;
    playerCount: number;
    value: SetCodeWithCardCount[];
};

export default function SetSelection({
    boosterCount,
    cardCountPerSet,
    cards,
    isLoading,
    onChange,
    value,
}: SetSelectionProps) {
    const setCodesWithCardCount = useMemo(
        () =>
            Object.entries(
                (cards || []).reduce((acc: { [key: string]: number }, card) => {
                    if (!acc[card.setCode]) {
                        acc[card.setCode] = 0;
                    }

                    acc[card.setCode]++;

                    return acc;
                }, {})
            )
                .sort(([, countA], [, countB]) => countB - countA)
                .map(([setCode, count]) => ({ setCode, count })),
        [cards]
    );

    const toggleSetSelection = useCallback(
        (set: SetCodeWithCardCount) => {
            const isSetSelected = value.some((s) => s.setCode === set.setCode);
            const updatedSelection = isSetSelected
                ? value.filter((s) => s.setCode !== set.setCode)
                : [...value, set];
            onChange(updatedSelection);
        },
        [onChange, value]
    );

    const setCodesListItems = useMemo(
        () =>
            setCodesWithCardCount?.map((set) => {
                const isDisabled =
                    (!value.some((s) => s.setCode === set.setCode) &&
                        value.length >= boosterCount) ||
                    set.count < cardCountPerSet;

                return (
                    <SetSelectionListItem
                        key={set.setCode}
                        set={set}
                        isDisabled={isDisabled}
                        isSelected={value.some(
                            (s) => s.setCode === set.setCode
                        )}
                        onToggle={() => toggleSetSelection(set)}
                    />
                );
            }),
        [
            boosterCount,
            cardCountPerSet,
            setCodesWithCardCount,
            toggleSetSelection,
            value,
        ]
    );

    useEffect(() => {
        if (value.length > boosterCount) {
            onChange(value.slice(0, boosterCount));
        }
    }, [boosterCount, onChange, value]);

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
            <fieldset>
                <legend>Set Selection</legend>
                <ul className={styles.list}>{setCodesListItems}</ul>
            </fieldset>

            <p>
                <b>Note:</b> Disabled sets do not have enough cards for your
                settings.
            </p>
        </div>
    );
}
