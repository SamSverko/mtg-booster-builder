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
} from "@mui/material";

import { CountInput, type OnChangeEvent } from "@/app/components";
import { CardCountBySet } from "@/app/types";

type SetSelectionProps = {
    allocatedBoosterCountBySet: CardCountBySet;
    cardCountBySet: CardCountBySet;
    onChange: (event: CardCountBySet) => void;
    requiredBoosterCount: number;
    requiredTotalCardCount: number;
    isLoading?: boolean;
};

export default function BoosterAllocation({
    allocatedBoosterCountBySet,
    cardCountBySet,
    isLoading,
    onChange,
    requiredBoosterCount,
    requiredTotalCardCount,
}: SetSelectionProps) {
    const totalAllocatedBoosters = useMemo(
        () =>
            Object.values(allocatedBoosterCountBySet).reduce(
                (acc, count) => acc + count,
                0
            ),
        [allocatedBoosterCountBySet]
    );

    const remainingBoostersToAllocate = useMemo(
        () => requiredBoosterCount - totalAllocatedBoosters,
        [requiredBoosterCount, totalAllocatedBoosters]
    );

    const resetBoosterAllocation = useCallback(() => {
        onChange({});
    }, [onChange]);

    const handleCountChange = useCallback(
        (setCode: string, event: OnChangeEvent) => {
            const currentCount = allocatedBoosterCountBySet[setCode] ?? 0;
            const newCount =
                {
                    "decrement-all": 0,
                    decrement: Math.max(currentCount - 1, 0),
                    increment: currentCount + 1,
                    "increment-all": currentCount + remainingBoostersToAllocate,
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
        [onChange, remainingBoostersToAllocate, allocatedBoosterCountBySet]
    );

    if (isLoading) {
        return (
            <Box display="flex" flexDirection="column" gap={1}>
                <InputLabel>Sets</InputLabel>
                <Alert severity="info">Loading sets...</Alert>
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
            <InputLabel>Sets</InputLabel>

            <Alert
                action={
                    totalAllocatedBoosters > 0 && (
                        <Button
                            color="inherit"
                            onClick={resetBoosterAllocation}
                            size="small"
                        >
                            RESET
                        </Button>
                    )
                }
                icon={false}
                severity={
                    remainingBoostersToAllocate === 0 ? "success" : "info"
                }
            >
                {remainingBoostersToAllocate === 0
                    ? "All boosters allocated!"
                    : `${remainingBoostersToAllocate} boosters remaining to allocate.`}
            </Alert>

            <TableContainer sx={{ maxHeight: "275px" }}>
                <Table size="small" stickyHeader>
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
                                    cardCountInSet < requiredTotalCardCount;
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
                                                        ? "Not enough cards in set"
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
