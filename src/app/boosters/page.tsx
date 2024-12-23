import { Alert, Box, Typography } from "@mui/material";

import { BoosterDisplay } from "@/app/components";
import { deserializeBoosters } from "@/app/utils";

type BoostersPageProps = {
    searchParams: Promise<{ [key: string]: string }>;
};

export default async function BoostersPage({
    searchParams,
}: BoostersPageProps) {
    const query = await searchParams;
    const serializedBoosters = query.serializedBoosters;
    const boosters = deserializeBoosters(serializedBoosters);

    return (
        <Box alignItems="center" display="flex" flexDirection="column" gap={2}>
            <Typography component="h2" variant="h6">
                Boosters
            </Typography>

            {boosters.length > 0 ? (
                boosters.map((cards, index) => (
                    <BoosterDisplay
                        cards={cards}
                        index={index + 1}
                        key={`booster-${cards[0].collectorNumber}-${index}`}
                    />
                ))
            ) : (
                <Alert severity="error">
                    No boosters found in the URL. Please provide a
                    serializedBoosters query param.
                </Alert>
            )}
        </Box>
    );
}
