"use client";

import { Alert, Box, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { BoostersTable } from "@/components";
import { deserializeBoosters } from "@/utils";
import { TOOLBAR_HEIGHT } from "@/constants";

function BoostersPageClient() {
    const searchParams = useSearchParams();
    const serializedBoosters = searchParams.get("serializedBoosters");

    const boosters = deserializeBoosters(serializedBoosters);

    return (
        <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            height={(theme) =>
                `calc(100dvh - ${TOOLBAR_HEIGHT} - ${theme.spacing(4)})`
            }
            gap={2}
            width="100%"
        >
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

export default function BoostersPage() {
    return (
        <Suspense>
            <BoostersPageClient />
        </Suspense>
    );
}
