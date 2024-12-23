"use client";

import { Alert, Box, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";

import { BoostersTable } from "@/app/components";
import { deserializeBoosters } from "@/app/utils";

export default function BoostersPage() {
    const searchParams = useSearchParams();
    const serializedBoosters = searchParams.get("serializedBoosters");

    const boosters = deserializeBoosters(serializedBoosters);

    return (
        <Box alignItems="center" display="flex" flexDirection="column" gap={2}>
            <Typography component="h2" variant="h6">
                Boosters
            </Typography>

            {boosters.length > 0 ? (
                <BoostersTable boosters={boosters} />
            ) : (
                <Alert severity="error">
                    No boosters found in the URL. Please provide a
                    serializedBoosters query param.
                </Alert>
            )}
        </Box>
    );
}
