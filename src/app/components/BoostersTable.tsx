import {
    Box,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { PlayBoosterSerialized } from "@/app/types";
import { PLAY_BOOSTER } from "@/app/constants";

type BoostersTableProps = {
    boosters: PlayBoosterSerialized[];
};

// TODO - Allow "combine" by same setCode & number
// TODO - Allow sort by columns
// TODO - Allow hide name and rarity
export default function BoostersTable({ boosters }: BoostersTableProps) {
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
                            <TableCell />
                            <TableCell align="right">#</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="center">R</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {boosters.map((booster, boosterIndex) =>
                            booster.c.map((card, cardIndex) => {
                                const rarityLetter = card.r
                                    .charAt(0)
                                    .toUpperCase();

                                return (
                                    <TableRow
                                        key={`${boosterIndex}-${cardIndex}`}
                                    >
                                        {cardIndex === 0 && (
                                            <TableCell
                                                align="center"
                                                rowSpan={
                                                    PLAY_BOOSTER.slots.length
                                                }
                                                sx={{
                                                    verticalAlign: "top",
                                                }}
                                            >
                                                {boosterIndex + 1}
                                            </TableCell>
                                        )}
                                        <TableCell align="right">
                                            {card.c}
                                        </TableCell>
                                        <TableCell>
                                            <Box
                                                alignItems="center"
                                                display="flex"
                                                gap={1}
                                            >
                                                {card.n}
                                                {card.f !== "normal" && (
                                                    <Chip
                                                        color="secondary"
                                                        label="F"
                                                        sx={{
                                                            height: (theme) =>
                                                                theme.spacing(
                                                                    2
                                                                ),
                                                            span: {
                                                                padding: "4px",
                                                                paddingTop:
                                                                    "4px",
                                                                paddingBottom:
                                                                    "2px",
                                                            },
                                                        }}
                                                    />
                                                )}
                                            </Box>
                                        </TableCell>
                                        <TableCell align="center">
                                            {rarityLetter}
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
}
