import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip,
} from "@mui/material";
import { useState } from "react";
import { PlayBoosterSerialized } from "@/app/types";
import { FoilChip } from "@/app/components";

type BoostersTableProps = {
    boosters: PlayBoosterSerialized[];
};

// TODO - Allow hide name and rarity
export default function BoostersTable({ boosters }: BoostersTableProps) {
    const [order, setOrder] = useState<"asc" | "desc">("asc");
    const [orderBy, setOrderBy] = useState<
        "boosterIndex" | "collectorNumber" | "name" | "rarity"
    >("boosterIndex");

    const handleSort = (
        property: "boosterIndex" | "collectorNumber" | "name" | "rarity"
    ) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    // Flatten all cards with their booster index
    const flattenedCards = boosters.flatMap((booster, boosterIndex) =>
        booster.c.map((card) => ({
            boosterIndex,
            collectorNumber: card.c,
            name: card.n,
            foil: card.f,
            rarity: card.r,
        }))
    );

    // Sort the flattened list dynamically by the selected column
    const sortedCards = [...flattenedCards].sort((a, b) => {
        const aValue = a[orderBy];
        const bValue = b[orderBy];

        if (aValue === bValue && orderBy !== "collectorNumber") {
            // Secondary sort by collector number for ties
            return order === "asc"
                ? a.collectorNumber - b.collectorNumber
                : b.collectorNumber - a.collectorNumber;
        }

        if (order === "asc") {
            return aValue < bValue ? -1 : 1;
        } else {
            return aValue > bValue ? -1 : 1;
        }
    });

    return (
        <Box
            flexGrow={1}
            display="flex"
            flexDirection="column"
            height="100%"
            overflow="hidden"
        >
            <TableContainer
                sx={{
                    flexGrow: 1,
                    overflow: "auto",
                }}
            >
                <Table size="small" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === "boosterIndex"}
                                    direction={order}
                                    onClick={() => handleSort("boosterIndex")}
                                >
                                    <Tooltip placement="top" title="Booster">
                                        <Box component="span">B</Box>
                                    </Tooltip>
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">
                                <TableSortLabel
                                    active={orderBy === "collectorNumber"}
                                    direction={order}
                                    onClick={() =>
                                        handleSort("collectorNumber")
                                    }
                                >
                                    <Tooltip
                                        placement="top"
                                        title="Collector Number"
                                    >
                                        <Box component="span">#</Box>
                                    </Tooltip>
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === "name"}
                                    direction={order}
                                    onClick={() => handleSort("name")}
                                >
                                    <Box component="span">Name</Box>
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="center">
                                <TableSortLabel
                                    active={orderBy === "rarity"}
                                    direction={order}
                                    onClick={() => handleSort("rarity")}
                                >
                                    <Tooltip placement="top" title="Rarity">
                                        <Box component="span">R</Box>
                                    </Tooltip>
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedCards.map((card, index) => (
                            <TableRow key={index}>
                                <TableCell align="center">
                                    {card.boosterIndex + 1}
                                </TableCell>
                                <TableCell align="right">
                                    {card.collectorNumber}
                                </TableCell>
                                <TableCell>
                                    <Box
                                        alignItems="center"
                                        display="flex"
                                        gap={1}
                                    >
                                        {card.name}
                                        {card.foil !== "normal" && <FoilChip />}
                                    </Box>
                                </TableCell>
                                <TableCell align="center">
                                    {card.rarity.charAt(0).toUpperCase()}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
