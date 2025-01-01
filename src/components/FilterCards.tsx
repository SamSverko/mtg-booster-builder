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
import { useMemo } from "react";

import { type CardImportData } from "@/components";
import { type BinderType, type Card } from "@/types";
import {
    getCardCount,
    getCardCountByBinderType,
    getCardCountBySetCode,
} from "@/utils";

type FilterCardsProps = {
    binderTypes: BinderType[];
    cards?: Card[];
    onChange: (
        binderTypes: BinderType[],
        cardDataFiltered: CardImportData
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
    const cardCountByBinderType = useMemo(
        () => getCardCountByBinderType(cards || []),
        [cards]
    );

    const handleChange = (binderType: string, checked: boolean) => {
        if (!cards) return;

        let newBinderTypes: BinderType[] = [];

        if (binderType === "*") {
            newBinderTypes = checked
                ? (Object.keys(cardCountByBinderType) as BinderType[])
                : [];
        } else {
            newBinderTypes = checked
                ? [...binderTypes, binderType as BinderType]
                : binderTypes.filter((type) => type !== binderType);
        }

        const filteredCards = cards.filter((card) =>
            newBinderTypes.includes(card.binderType)
        );

        const newCardDataFiltered = {
            cards: filteredCards,
            cardCount: getCardCount(filteredCards),
            cardCountBySetCode: getCardCountBySetCode(filteredCards),
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
                                        Object.keys(cardCountByBinderType)
                                            .length
                                }
                                checked={
                                    binderTypes.length ===
                                    Object.keys(cardCountByBinderType).length
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
                    {Object.entries(cardCountByBinderType).map(
                        ([binderType, count]) => (
                            <TableRow key={binderType}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={binderTypes.includes(
                                            binderType as BinderType
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
                            {Object.values(cardCountByBinderType)
                                .filter((_, index) =>
                                    binderTypes.includes(
                                        Object.keys(cardCountByBinderType)[
                                            index
                                        ] as BinderType
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
