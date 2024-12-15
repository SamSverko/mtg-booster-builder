import { Box, Divider, List, ListItem, Typography } from "@mui/material";

import { CardCountBySet } from "@/app/types";

type ConfirmDetailsProps = {
    allocatedBoosterCountBySet: CardCountBySet;
    requiredBoosterCount: number;
    requiredCardCountPerSet: number;
};

export default function ConfirmDetails({
    allocatedBoosterCountBySet,
    requiredBoosterCount,
    requiredCardCountPerSet,
}: ConfirmDetailsProps) {
    return (
        <List disablePadding>
            <ListItem
                disableGutters
                secondaryAction={
                    <Typography>{requiredBoosterCount}</Typography>
                }
            >
                <Typography>
                    <Box component="b">Boosters to be generated</Box>
                </Typography>
            </ListItem>
            <Divider />
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
                                    <Typography>
                                        {allocatedBoosterCount}
                                    </Typography>
                                }
                            >
                                <Typography>{setCode}</Typography>
                            </ListItem>
                        )
                    )
                )}
            </List>
            <Divider />
            <ListItem
                disableGutters
                secondaryAction={
                    <Typography>{requiredCardCountPerSet}</Typography>
                }
            >
                <Typography fontWeight="bold">Total cards needed</Typography>
            </ListItem>
        </List>
    );
}
