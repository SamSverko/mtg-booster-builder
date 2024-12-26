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
import { getCardCountByLocation, getCardCountBySet } from "@/utils";
import { useEffect, useMemo, useState } from "react";

type FilterCardsProps = {
    cardData?: App.CardData;
    onChange: (cardDataFiltered: App.CardData) => void;
};

/**
 * Component for filtering cards.
 */
export function FilterCards({ cardData, onChange }: FilterCardsProps) {
    const [selectedLocations, setSelectedLocations] = useState<
        ManaBox.BinderType[]
    >(["binder"]);

    const cardCountByLocation = useMemo(
        () => getCardCountByLocation(cardData?.cards || []),
        [cardData?.cards]
    );

    const handleCheckboxChange = (
        location: ManaBox.BinderType,
        isChecked: boolean
    ) => {
        if (isChecked) {
            setSelectedLocations([...selectedLocations, location]);
        } else {
            setSelectedLocations(
                selectedLocations.filter(
                    (selectedLocation) => selectedLocation !== location
                )
            );
        }
    };

    useEffect(() => {
        if (!cardData) return;

        const filteredCards = cardData.cards.filter((card) =>
            selectedLocations.includes(card.binderType)
        );

        const newCardDataFiltered = {
            cards: filteredCards,
            cardCountBySet: getCardCountBySet(filteredCards),
        };

        onChange(newCardDataFiltered);
    }, [cardData, onChange, selectedLocations]);

    if (!cardData || cardData.cards.length === 0) {
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
                                    selectedLocations.length > 0 &&
                                    selectedLocations.length <
                                        Object.keys(cardCountByLocation).length
                                }
                                checked={
                                    selectedLocations.length ===
                                    Object.keys(cardCountByLocation).length
                                }
                                onChange={(e) => {
                                    const isChecked = e.target.checked;
                                    const allLocations = Object.keys(
                                        cardCountByLocation
                                    ) as ManaBox.BinderType[];
                                    setSelectedLocations(
                                        isChecked ? allLocations : []
                                    );
                                }}
                            />
                        </TableCell>
                        <TableCell>Location</TableCell>
                        <TableCell align="right">Card Count</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(cardCountByLocation).map(
                        ([location, count]) => (
                            <TableRow key={location}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedLocations.includes(
                                            location as ManaBox.BinderType
                                        )}
                                        onChange={(e) =>
                                            handleCheckboxChange(
                                                location as ManaBox.BinderType,
                                                e.target.checked
                                            )
                                        }
                                    />
                                </TableCell>
                                <TableCell
                                    sx={{
                                        textTransform: "capitalize",
                                    }}
                                >
                                    {location}
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
                                    selectedLocations.includes(
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
