import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
    Box,
    Button,
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
import { type CardRarity } from "@/types";
import { FoilChip } from "@/components";
import {
    compareRarityOrder,
    type BoosterCondensed,
    type CardCondensed,
} from "@/utils";

type BoostersTableProps = {
    boosters: BoosterCondensed[];
};

type Order = "asc" | "desc";
type OrderBy =
    | "binderType"
    | "boosterIndex"
    | "collectorNumber"
    | "foil"
    | "name"
    | "rarity"
    | "setCode";

/**
 * Component for displaying a table of serialized boosters.
 */
export function BoostersTable({ boosters }: BoostersTableProps) {
    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState<OrderBy>("boosterIndex");
    const [areSpoilersHidden, setAreSpoilersHidden] = useState(true);
    const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

    const handleSort = (property: OrderBy) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleRowSelect = (id: string) => {
        setSelectedRows((prevSelectedRows) => {
            const newSelectedRows = new Set(prevSelectedRows);
            if (newSelectedRows.has(id)) {
                newSelectedRows.delete(id);
            } else {
                newSelectedRows.add(id);
            }
            return newSelectedRows;
        });
    };

    // Flatten all cards with their booster index
    const flattenedCards: {
        id: string;
        boosterIndex: number;
        binderType: CardCondensed["b"];
        collectorNumber: CardCondensed["c"];
        name?: CardCondensed["n"];
        foil: CardCondensed["f"];
        rarity?: CardCondensed["r"];
        setCode: BoosterCondensed["s"];
    }[] = boosters.flatMap((booster, boosterIndex) =>
        booster.c.map((card) => ({
            id: `${boosterIndex}-${card.c}-${card.n}`,
            boosterIndex,
            binderType: card.b,
            collectorNumber: card.c,
            name: card.n,
            foil: card.f,
            rarity: card.r,
            setCode: booster.s,
        }))
    );

    const sortedCards = [...flattenedCards].sort((a, b) => {
        if (orderBy === "rarity") {
            // Compare using compareRarityOrder for rarity
            const primaryComparison = compareRarityOrder(
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

            if (primaryValueA === undefined || primaryValueB === undefined) {
                return 0;
            }

            // Numeric sorting for `boosterIndex` and `collectorNumber`
            if (orderBy === "boosterIndex" || orderBy === "collectorNumber") {
                const comparison =
                    Number(primaryValueA) - Number(primaryValueB);
                return order === "asc" ? comparison : -comparison;
            }

            // Lexicographic sorting for other fields
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

    if (areSpoilersHidden) {
        sortedCards.forEach((card) => {
            delete card.name;
            delete card.rarity;
        });
    }

    return (
        <Box
            flexGrow={1}
            display="flex"
            flexDirection="column"
            gap={2}
            height="100%"
            overflow="hidden"
            width="100%"
        >
            <Box display="flex" justifyContent="flex-end">
                <Button
                    onClick={() => {
                        setAreSpoilersHidden(!areSpoilersHidden);
                    }}
                    size="small"
                    startIcon={
                        areSpoilersHidden ? <Visibility /> : <VisibilityOff />
                    }
                    variant={areSpoilersHidden ? "contained" : "outlined"}
                >
                    Spoilers
                </Button>
            </Box>
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
                        "td, th": {
                            padding: "4px",
                        },
                    }}
                >
                    <TableHead>
                        <TableRow>
                            {/* BOOSTER */}
                            <TableCell align="right">
                                <TableSortLabel
                                    active={orderBy === "boosterIndex"}
                                    direction={order}
                                    onClick={() => handleSort("boosterIndex")}
                                >
                                    <Tooltip placement="top" title="Boosters">
                                        <Box component="span">B</Box>
                                    </Tooltip>
                                </TableSortLabel>
                            </TableCell>
                            {/* BINDER TYPE */}
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === "binderType"}
                                    direction={order}
                                    onClick={() => handleSort("binderType")}
                                >
                                    <Tooltip
                                        placement="top"
                                        title={!areSpoilersHidden && "Location"}
                                    >
                                        <Box component="span">
                                            {areSpoilersHidden
                                                ? "Location"
                                                : "L"}
                                        </Box>
                                    </Tooltip>
                                </TableSortLabel>
                            </TableCell>
                            {/* SET CODE */}
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === "setCode"}
                                    direction={order}
                                    onClick={() => handleSort("setCode")}
                                >
                                    <Tooltip placement="top" title="Set Code">
                                        <Box component="span">
                                            {areSpoilersHidden ? "Set" : "S"}
                                        </Box>
                                    </Tooltip>
                                </TableSortLabel>
                            </TableCell>
                            {/* FOIL */}
                            {areSpoilersHidden && (
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === "foil"}
                                        direction={order}
                                        onClick={() => handleSort("foil")}
                                    >
                                        <Tooltip
                                            placement="top"
                                            title="Is foil?"
                                        >
                                            <Box component="span">Foil</Box>
                                        </Tooltip>
                                    </TableSortLabel>
                                </TableCell>
                            )}
                            {/* RARITY */}
                            {!areSpoilersHidden && (
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
                            )}
                            {/* NAME */}
                            {!areSpoilersHidden && (
                                <TableCell>
                                    <TableSortLabel
                                        active={orderBy === "name"}
                                        direction={order}
                                        onClick={() => handleSort("name")}
                                    >
                                        <Box component="span">Name</Box>
                                    </TableSortLabel>
                                </TableCell>
                            )}
                            {/* COLLECTOR NUMBER */}
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
                                        <Box component="span">
                                            {areSpoilersHidden ? "Number" : "#"}
                                        </Box>
                                    </Tooltip>
                                </TableSortLabel>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedCards.map((card) => (
                            <TableRow
                                key={card.id}
                                onClick={() => handleRowSelect(card.id)}
                                selected={selectedRows.has(card.id)}
                                sx={{ cursor: "pointer" }}
                            >
                                {/* BOOSTER */}
                                <TableCell align="right">
                                    {card.boosterIndex + 1}
                                </TableCell>
                                {/* BINDER TYPE */}
                                <TableCell
                                    sx={{
                                        textTransform: "capitalize",
                                    }}
                                >
                                    {card.binderType}
                                </TableCell>
                                {/* SET CODE */}
                                <TableCell>{card.setCode}</TableCell>
                                {/* FOIL */}
                                {areSpoilersHidden && (
                                    <TableCell>
                                        {card.foil !== "normal" && <FoilChip />}
                                    </TableCell>
                                )}
                                {/* RARITY */}
                                {!areSpoilersHidden && (
                                    <TableCell align="center">
                                        <Tooltip
                                            placement="top"
                                            slotProps={{
                                                tooltip: {
                                                    sx: {
                                                        textTransform:
                                                            "capitalize",
                                                    },
                                                },
                                            }}
                                            title={card.rarity}
                                        >
                                            <Box component="span">
                                                {card.rarity
                                                    ?.charAt(0)
                                                    .toUpperCase()}
                                            </Box>
                                        </Tooltip>
                                    </TableCell>
                                )}
                                {/* NAME */}
                                {!areSpoilersHidden && (
                                    <TableCell width="100%">
                                        <Box
                                            alignItems="center"
                                            display="flex"
                                            gap={1}
                                        >
                                            {card.name}
                                            {card.foil !== "normal" && (
                                                <FoilChip />
                                            )}
                                        </Box>
                                    </TableCell>
                                )}
                                {/* COLLECTOR NUMBER */}
                                <TableCell align="right">
                                    {card.collectorNumber}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
