import { Box, Divider, List, ListItem, Typography } from "@mui/material";

import { FORMAT_NONE, PLAY_BOOSTER } from "@/app/constants";
import { CardCountBySet } from "@/app/types";

type ConfirmDetailsProps = {
    allocatedBoosterCountBySet: CardCountBySet;
    requiredBoosterCount: number;
    requiredTotalCardCount: number;
};

export default function ConfirmDetails({
    allocatedBoosterCountBySet,
    requiredBoosterCount,
    requiredTotalCardCount,
}: ConfirmDetailsProps) {
    const cardCountPerBooster = PLAY_BOOSTER.slots.length;

    return (
        <List disablePadding>
            <ListItem
                disableGutters
                secondaryAction={
                    <Typography>{requiredBoosterCount}</Typography>
                }
            >
                <Typography>Boosters to be generated</Typography>
            </ListItem>
            <List disablePadding>
                {!Object.keys(allocatedBoosterCountBySet).length ? (
                    <ListItem disableGutters>
                        <Typography>No boosters allocated</Typography>
                    </ListItem>
                ) : (
                    Object.entries(allocatedBoosterCountBySet).map(
                        ([setCode, allocatedBoosterCount]) => (
                            <ListItem
                                disableGutters
                                key={setCode}
                                secondaryAction={
                                    <Typography color="text.secondary">
                                        {allocatedBoosterCount}
                                    </Typography>
                                }
                                sx={{
                                    pl: 2,
                                }}
                            >
                                <Typography color="text.secondary">
                                    {setCode}
                                </Typography>
                            </ListItem>
                        )
                    )
                )}
            </List>
            <ListItem
                disableGutters
                secondaryAction={<Typography>{cardCountPerBooster}</Typography>}
            >
                <Typography>Cards needed per booster</Typography>
            </ListItem>
            <ListItem
                disableGutters
                secondaryAction={
                    <Typography>{requiredTotalCardCount}</Typography>
                }
            >
                <Typography>Total cards needed</Typography>
            </ListItem>
        </List>
    );
}
