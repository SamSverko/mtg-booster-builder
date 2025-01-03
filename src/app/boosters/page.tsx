"use client";

import { Alert, Box } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { BoostersTable } from "@/components";
import { deserializeBoosters } from "@/utils";
import { LS_KEY_SERIALIZED_BOOSTERS, APP_TOOLBAR_HEIGHT } from "@/constants";

function BoostersPageClient() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(true);

    const serializedBoosters = searchParams.get("serializedBoosters");

    useEffect(() => {
        if (serializedBoosters) {
            localStorage.setItem(
                LS_KEY_SERIALIZED_BOOSTERS,
                serializedBoosters
            );
            setIsLoading(false);
        } else {
            const savedBoosters = localStorage.getItem(
                LS_KEY_SERIALIZED_BOOSTERS
            );
            if (savedBoosters) {
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.set("serializedBoosters", savedBoosters);
                router.push(newUrl.toString());
            } else {
                setIsLoading(false);
            }
        }
    }, [serializedBoosters, router]);

    const boosters = deserializeBoosters(serializedBoosters);

    return (
        <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            height={(theme) =>
                `calc(100dvh - ${APP_TOOLBAR_HEIGHT} - ${theme.spacing(4)})`
            }
            gap={2}
            width="100%"
        >
            {isLoading && !serializedBoosters && (
                <Alert
                    severity="info"
                    sx={{
                        boxSizing: "border-box",
                        width: "100%",
                    }}
                >
                    Loading...
                </Alert>
            )}
            {boosters.length > 0 && <BoostersTable boosters={boosters} />}
            {!isLoading && !serializedBoosters && (
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
