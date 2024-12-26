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
import { App, ManaBox } from "@/types";
import { FoilChip } from "@/components";
import { compareRarityOrder } from "@/utils";

type BoostersTableProps = {
    boosters: App.PlayBoosterSerialized[];
};

type Order = "asc" | "desc";
type OrderBy =
    | "binderType"
    | "boosterIndex"
    | "collectorNumber"
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

    const handleSort = (property: OrderBy) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    // Flatten all cards with their booster index
    const flattenedCards: {
        boosterIndex: number;
        binderType: App.PlayBoosterCardSerialized["b"];
        collectorNumber: App.PlayBoosterCardSerialized["c"];
        name?: App.PlayBoosterCardSerialized["n"];
        foil: App.PlayBoosterCardSerialized["f"];
        rarity?: App.PlayBoosterCardSerialized["r"];
        setCode: App.PlayBoosterSerialized["s"];
    }[] = boosters.flatMap((booster, boosterIndex) =>
        booster.c.map((card) => ({
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
                a.rarity as ManaBox.CardRarity,
                b.rarity as ManaBox.CardRarity
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
                                    <Tooltip
                                        placement="top"
                                        title={!areSpoilersHidden && "Boosters"}
                                    >
                                        <Box component="span">
                                            {areSpoilersHidden
                                                ? "Booster"
                                                : "B"}
                                        </Box>
                                    </Tooltip>
                                </TableSortLabel>
                            </TableCell>
                            {/* LOCATION (i.e. binderType) */}
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
                                    <Tooltip
                                        placement="top"
                                        title={!areSpoilersHidden && "Set Code"}
                                    >
                                        <Box component="span">
                                            {areSpoilersHidden
                                                ? "Set Code"
                                                : "S"}
                                        </Box>
                                    </Tooltip>
                                </TableSortLabel>
                            </TableCell>
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
                                        title={
                                            !areSpoilersHidden &&
                                            "Collector Number"
                                        }
                                    >
                                        <Box component="span">
                                            {areSpoilersHidden
                                                ? "Collector Number"
                                                : "#"}
                                        </Box>
                                    </Tooltip>
                                </TableSortLabel>
                            </TableCell>
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
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedCards.map((card, index) => (
                            <TableRow key={index}>
                                {/* BOOSTER */}
                                <TableCell align="right">
                                    {card.boosterIndex + 1}
                                </TableCell>
                                {/* LOCATION */}
                                <TableCell
                                    sx={{
                                        textTransform: "capitalize",
                                    }}
                                >
                                    {card.binderType}
                                </TableCell>
                                {/* SET CODE */}
                                <TableCell>{card.setCode}</TableCell>
                                {/* COLLECTOR NUMBER */}
                                <TableCell align="right">
                                    {card.collectorNumber}
                                </TableCell>
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
