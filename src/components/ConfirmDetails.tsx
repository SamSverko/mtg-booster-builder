import { List, ListItem, Typography } from "@mui/material";

import { MTG } from "@/constants";
import { App } from "@/types";

type ConfirmDetailsProps = {
    allocatedBoosterCountBySetCode: App.AllocatedBoosterCountBySetCode;
    requiredBoosterCount: number;
};

/**
 * Component for displaying the details of the booster allocation.
 */
export function ConfirmDetails({
    allocatedBoosterCountBySetCode,
    requiredBoosterCount,
}: ConfirmDetailsProps) {
    const cardCountPerBooster = MTG.PLAY_BOOSTER.slots.length;
    const requiredTotalCardCount = requiredBoosterCount * cardCountPerBooster;

    return (
        <List dense disablePadding>
            <ListItem
                disableGutters
                secondaryAction={
                    <Typography>{requiredBoosterCount}</Typography>
                }
            >
                <Typography>Boosters to be generated</Typography>
            </ListItem>
            <List disablePadding>
                {Object.entries(allocatedBoosterCountBySetCode).map(
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
