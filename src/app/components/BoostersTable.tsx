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
import { CardRarity, PlayBoosterSerialized } from "@/app/types";
import { FoilChip } from "@/app/components";
import { COMPARE_RARITY_ORDER } from "@/app/constants";

type BoostersTableProps = {
    boosters: PlayBoosterSerialized[];
};

type Order = "asc" | "desc";
type OrderBy =
    | "boosterIndex"
    | "collectorNumber"
    | "name"
    | "rarity"
    | "setCode";

// TODO - Allow hide name and rarity
export default function BoostersTable({ boosters }: BoostersTableProps) {
    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState<OrderBy>("boosterIndex");

    const handleSort = (property: OrderBy) => {
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
            setCode: booster.s,
        }))
    );

    const sortedCards = [...flattenedCards].sort((a, b) => {
        if (orderBy === "rarity") {
            // Compare using COMPARE_RARITY_ORDER for rarity
            const primaryComparison = COMPARE_RARITY_ORDER(
                a.rarity as CardRarity,
                b.rarity as CardRarity
            );
            if (primaryComparison !== 0) {
                return order === "asc" ? primaryComparison : -primaryComparison;
            }
        } else {
            // Default comparison for other fields (boosterIndex, collectorNumber, etc.)
            const primaryValueA = a[orderBy];
            const primaryValueB = b[orderBy];

            if (primaryValueA < primaryValueB) {
                return order === "asc" ? -1 : 1;
            }
            if (primaryValueA > primaryValueB) {
                return order === "asc" ? 1 : -1;
            }
        }

        // Secondary sorting logic (Set Code or Collector Number) for other fields
        if (orderBy !== "rarity") {
            const secondaryKey =
                orderBy === "setCode" ? "collectorNumber" : "setCode";
            const secondaryValueA = a[secondaryKey];
            const secondaryValueB = b[secondaryKey];

            if (secondaryValueA < secondaryValueB) {
                return order === "asc" ? -1 : 1;
            }
            if (secondaryValueA > secondaryValueB) {
                return order === "asc" ? 1 : -1;
            }
        }

        return 0;
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
                <Table
                    size="small"
                    stickyHeader
                    sx={{
                        th: {
                            padding: 0,
                        },
                        td: {
                            padding: "4px",
                        },
                    }}
                >
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
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === "setCode"}
                                    direction={order}
                                    onClick={() => handleSort("setCode")}
                                >
                                    <Tooltip placement="top" title="Set Code">
                                        <Box component="span">S</Box>
                                    </Tooltip>
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
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
                                <TableCell align="right">
                                    {card.boosterIndex + 1}
                                </TableCell>
                                <TableCell>{card.setCode}</TableCell>
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
                                    <Tooltip
                                        placement="top"
                                        slotProps={{
                                            tooltip: {
                                                sx: {
                                                    textTransform: "capitalize",
                                                },
                                            },
                                        }}
                                        title={card.rarity}
                                    >
                                        <Box component="span">
                                            {card.rarity
                                                .charAt(0)
                                                .toUpperCase()}
                                        </Box>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
