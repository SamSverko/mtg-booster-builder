import { useCallback, useMemo } from "react";
import {
    Alert,
    Box,
    Button,
    InputLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";

import { CountInput, CountInputOnChangeEvent } from "@/components";
import { MTG } from "@/constants";
import { AllocatedBoosterCountBySet, CardCountBySet } from "@/types";

type SetSelectionProps = {
    allocatedBoosterCountBySet: AllocatedBoosterCountBySet;
    onChange: (allocatedBoosterCountBySet: AllocatedBoosterCountBySet) => void;
    cardCountBySet?: CardCountBySet;
    requiredBoosterCount: number;
    totalAllocatedBoosters: number;
};

/**
 * Component for allocating boosters to sets.
 */
export function BoosterAllocation({
    allocatedBoosterCountBySet,
    cardCountBySet,
    onChange,
    requiredBoosterCount,
    totalAllocatedBoosters,
}: SetSelectionProps) {
    const remainingBoostersToAllocate = useMemo(
        () => requiredBoosterCount - totalAllocatedBoosters,
        [requiredBoosterCount, totalAllocatedBoosters]
    );

    const resetBoosterAllocation = useCallback(() => {
        onChange({});
    }, [onChange]);

    const handleCountChange = useCallback(
        (setCode: string, event: CountInputOnChangeEvent) => {
            if (!cardCountBySet) return;

            const currentCount = allocatedBoosterCountBySet[setCode] ?? 0;
            const maxBoostersForSet = Math.floor(
                cardCountBySet[setCode] / MTG.PLAY_BOOSTER.slots.length
            ); // Calculate max boosters this set can handle based on card count

            const newCount =
                {
                    "decrement-all": 0,
                    decrement: Math.max(currentCount - 1, 0),
                    increment: currentCount + 1,
                    "increment-all": Math.min(
                        currentCount + remainingBoostersToAllocate, // Allocate remaining boosters
                        maxBoostersForSet // But don't exceed the max boosters the set can handle
                    ),
                }[event] ?? currentCount;

            if (newCount !== currentCount) {
                const updatedAllocation = { ...allocatedBoosterCountBySet };

                if (newCount === 0) {
                    delete updatedAllocation[setCode];
                } else {
                    updatedAllocation[setCode] = newCount;
                }

                onChange(updatedAllocation);
            }
        },
        [
            onChange,
            remainingBoostersToAllocate,
            allocatedBoosterCountBySet,
            cardCountBySet,
        ]
    );

    if (!cardCountBySet) {
        return (
            <Box display="flex" flexDirection="column" gap={1}>
                <Typography>Missing card data!</Typography>
            </Box>
        );
    }

    if (!cardCountBySet) {
        return (
            <Box display="flex" flexDirection="column" gap={1}>
                <InputLabel>Sets</InputLabel>
                <Alert severity="error">No sets available.</Alert>
            </Box>
        );
    }

    return (
        <Box display="flex" flexDirection="column" gap={1}>
            <Button
                color="info"
                onClick={resetBoosterAllocation}
                size="small"
                variant="outlined"
                fullWidth
            >
                Reset booster allocation
            </Button>

            <TableContainer sx={{ maxHeight: "275px" }}>
                <Table padding="none" size="small" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>Set</TableCell>
                            <TableCell align="right">Total cards</TableCell>
                            <TableCell align="center">Boosters</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.entries(cardCountBySet).map(
                            ([setCode, cardCountInSet]) => {
                                const allocatedBoostersForSet =
                                    allocatedBoosterCountBySet[setCode] || 0;

                                const notEnoughCards =
                                    cardCountInSet <
                                    (allocatedBoostersForSet + 1) *
                                        MTG.PLAY_BOOSTER.slots.length;

                                return (
                                    <TableRow key={setCode}>
                                        <TableCell>{setCode}</TableCell>
                                        <TableCell align="right">
                                            {cardCountInSet}
                                        </TableCell>
                                        <TableCell>
                                            <Tooltip
                                                title={
                                                    notEnoughCards
                                                        ? "Maximum boosters allocated for this set."
                                                        : ""
                                                }
                                                placement="top"
                                                slotProps={{
                                                    popper: {
                                                        modifiers: [
                                                            {
                                                                name: "offset",
                                                                options: {
                                                                    offset: [
                                                                        0, -14,
                                                                    ],
                                                                },
                                                            },
                                                        ],
                                                    },
                                                }}
                                            >
                                                <Box
                                                    display="flex"
                                                    justifyContent="center"
                                                >
                                                    <CountInput
                                                        disableDecrementAll={
                                                            !allocatedBoostersForSet ||
                                                            allocatedBoostersForSet ===
                                                                0
                                                        }
                                                        disableDecrement={
                                                            !allocatedBoostersForSet ||
                                                            allocatedBoostersForSet ===
                                                                0
                                                        }
                                                        disableIncrement={
                                                            notEnoughCards ||
                                                            remainingBoostersToAllocate ===
                                                                0
                                                        }
                                                        disableIncrementAll={
                                                            notEnoughCards ||
                                                            remainingBoostersToAllocate ===
                                                                0
                                                        }
                                                        onChange={(event) => {
                                                            handleCountChange(
                                                                setCode,
                                                                event
                                                            );
                                                        }}
                                                        showAllControls
                                                        value={
                                                            allocatedBoostersForSet ||
                                                            0
                                                        }
                                                    />
                                                </Box>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                );
                            }
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
