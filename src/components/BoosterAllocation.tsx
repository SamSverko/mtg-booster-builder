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
import { PLAY_BOOSTER_RULE } from "@/constants";
import { App } from "@/types";
import { type CardCountBySetCode } from "@/utils";

type SetSelectionProps = {
    allocatedBoosterCountBySetCode: App.AllocatedBoosterCountBySetCode;
    onChange: (
        allocatedBoosterCountBySetCode: App.AllocatedBoosterCountBySetCode
    ) => void;
    cardCountBySetCode?: CardCountBySetCode;
    requiredBoosterCount: number;
    totalAllocatedBoosters: number;
};

/**
 * Component for allocating boosters to sets.
 */
export function BoosterAllocation({
    allocatedBoosterCountBySetCode,
    cardCountBySetCode,
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
            if (!cardCountBySetCode) return;

            const currentCount = allocatedBoosterCountBySetCode[setCode] ?? 0;
            const maxBoostersForSet = Math.floor(
                cardCountBySetCode[setCode] / PLAY_BOOSTER_RULE.slots.length
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
                const updatedAllocation = { ...allocatedBoosterCountBySetCode };

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
            allocatedBoosterCountBySetCode,
            cardCountBySetCode,
        ]
    );

    if (!cardCountBySetCode) {
        return (
            <Box display="flex" flexDirection="column" gap={1}>
                <Typography>Missing card data!</Typography>
            </Box>
        );
    }

    if (!cardCountBySetCode) {
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
                        {Object.entries(cardCountBySetCode).map(
                            ([setCode, cardCountInSet]) => {
                                const allocatedBoostersForSet =
                                    allocatedBoosterCountBySetCode[setCode] ||
                                    0;

                                const notEnoughCards =
                                    cardCountInSet <
                                    (allocatedBoostersForSet + 1) *
                                        PLAY_BOOSTER_RULE.slots.length;

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
