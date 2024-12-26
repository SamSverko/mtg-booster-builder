import {
    Alert,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

import { App, ManaBox } from "@/types";
import {
    getCardCount,
    getCardCountByLocation,
    getCardCountBySet,
} from "@/utils";
import { useMemo } from "react";

type FilterCardsProps = {
    binderTypes: ManaBox.BinderType[];
    cards?: ManaBox.Card[];
    onChange: (
        binderTypes: ManaBox.BinderType[],
        cardDataFiltered: App.CardData
    ) => void;
};

/**
 * Component for filtering cards.
 */
export function FilterCards({
    binderTypes,
    cards,
    onChange,
}: FilterCardsProps) {
    const cardCountByLocation = useMemo(
        () => getCardCountByLocation(cards || []),
        [cards]
    );

    const handleChange = (binderType: string, checked: boolean) => {
        if (!cards) return;

        let newBinderTypes: ManaBox.BinderType[] = [];

        if (binderType === "*") {
            newBinderTypes = checked
                ? (Object.keys(cardCountByLocation) as ManaBox.BinderType[])
                : [];
        } else {
            newBinderTypes = checked
                ? [...binderTypes, binderType as ManaBox.BinderType]
                : binderTypes.filter((type) => type !== binderType);
        }

        const filteredCards = cards.filter((card) =>
            newBinderTypes.includes(card.binderType)
        );

        const newCardDataFiltered = {
            cards: filteredCards,
            cardCount: getCardCount(filteredCards),
            cardCountBySet: getCardCountBySet(filteredCards),
        };

        onChange(newBinderTypes, newCardDataFiltered);
    };

    if (!cards) {
        return <Alert severity="error">No cards available.</Alert>;
    }

    return (
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                indeterminate={
                                    binderTypes.length > 0 &&
                                    binderTypes.length <
                                        Object.keys(cardCountByLocation).length
                                }
                                checked={
                                    binderTypes.length ===
                                    Object.keys(cardCountByLocation).length
                                }
                                onChange={(_, checked) => {
                                    handleChange("*", checked);
                                }}
                            />
                        </TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell align="right">Card Count</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(cardCountByLocation).map(
                        ([binderType, count]) => (
                            <TableRow key={binderType}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={binderTypes.includes(
                                            binderType as ManaBox.BinderType
                                        )}
                                        onChange={(_, checked) => {
                                            handleChange(binderType, checked);
                                        }}
                                    />
                                </TableCell>
                                <TableCell
                                    sx={{
                                        textTransform: "capitalize",
                                    }}
                                >
                                    {binderType}
                                </TableCell>
                                <TableCell align="right">{count}</TableCell>
                            </TableRow>
                        )
                    )}
                    <TableRow>
                        <TableCell padding="checkbox" />
                        <TableCell>Total selected</TableCell>
                        <TableCell align="right">
                            {Object.values(cardCountByLocation)
                                .filter((_, index) =>
                                    binderTypes.includes(
                                        Object.keys(cardCountByLocation)[
                                            index
                                        ] as ManaBox.BinderType
                                    )
                                )
                                .reduce((acc, count) => acc + count, 0)}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}
