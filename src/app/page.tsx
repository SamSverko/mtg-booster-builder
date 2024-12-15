"use client";

import { Alert, Box, Button, Divider, Typography } from "@mui/material";

import { useEffect, useMemo, useState } from "react";

import {
    BoosterAllocation,
    CardCount,
    ConfirmDetails,
    CountInput,
    FormatSelect,
    GeneratedBoosters,
    type OnChangeEvent,
} from "@/app/components";
import { FORMAT_NONE, PLAY_BOOSTER } from "@/app/constants";
import { useCards } from "@/app/hooks";
import { CardCountBySet, Format, ManaBoxCard } from "@/app/types";
import { getBoosters } from "@/app/utils";

export default function Home() {
    const { data, isLoading } = useCards();

    const [format, setFormat] = useState<Format>(() => FORMAT_NONE);
    const [playerCount, setPlayerCount] = useState<number>(
        () => format.minPlayerCount || 1
    );

    const [allocatedBoosterCountBySet, setAllocatedBoosterCountBySet] =
        useState<CardCountBySet>({});
    const [generatedBoosters, setGeneratedBoosters] = useState<ManaBoxCard[][]>(
        []
    );

    const boosterRequirements = useMemo(() => {
        const cardCountPerBooster = PLAY_BOOSTER.slots.length;
        if (!format || !format.boosterPerPlayerCount) {
            return {
                boosterCount: playerCount,
                totalCardCount: playerCount * cardCountPerBooster,
            };
        }

        const boosterCount = Math.ceil(
            playerCount * format.boosterPerPlayerCount
        );
        const totalCardCount = boosterCount * cardCountPerBooster;

        return { boosterCount, totalCardCount };
    }, [format, playerCount, PLAY_BOOSTER.slots.length]);

    const handlePlayerChange = (event: OnChangeEvent) => {
        switch (event) {
            case "decrement":
                setPlayerCount(Math.max(playerCount - 1, 1));
                break;
            case "increment":
                setPlayerCount(playerCount + 1);
                break;
            default:
                break;
        }
    };

    // TODO - Fix double render on format change
    useEffect(() => {
        setPlayerCount(format.minPlayerCount || 1);
        setAllocatedBoosterCountBySet({});
        setGeneratedBoosters([]);
    }, [format]);

    // TODO - Use loading Skeletons instead?
    if (isLoading) {
        return (
            <Box
                display="flex"
                flexDirection="column"
                gap={3}
                m="0 auto"
                maxWidth="400px"
            >
                <Alert severity="info">Loading...</Alert>
            </Box>
        );
    }

    if (!data || !data.cardCountBySet || data.cardCountBySet.length === 0) {
        return (
            <Box
                display="flex"
                flexDirection="column"
                gap={3}
                m="0 auto"
                maxWidth="400px"
            >
                <Alert severity="info">
                    No booster allocation data available.
                </Alert>
            </Box>
        );
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={3}
            m="0 auto"
            maxWidth="400px"
        >
            <Typography component="h1" variant="h5">
                MTG Booster Builder
            </Typography>

            <Divider />

            <Typography component="h2" variant="h6">
                Step 1: Import your cards
            </Typography>
            <CardCount cardCount={data.cards?.length} isLoading={isLoading} />

            <Divider />

            <Typography component="h2" variant="h6">
                Step 2: Choose your setup
            </Typography>

            <FormatSelect onChange={setFormat} value={format} />

            <CountInput
                disableDecrement={playerCount <= format.minPlayerCount}
                disableIncrement={
                    format.maxPlayerCount
                        ? playerCount >= format.maxPlayerCount
                        : false
                }
                label="Players"
                onChange={handlePlayerChange}
                value={playerCount}
            />

            <BoosterAllocation
                allocatedBoosterCountBySet={allocatedBoosterCountBySet}
                cardCountBySet={data.cardCountBySet}
                isLoading={isLoading}
                onChange={setAllocatedBoosterCountBySet}
                requiredBoosterCount={boosterRequirements.boosterCount}
                requiredTotalCardCount={boosterRequirements.totalCardCount}
            />

            <Divider />

            <Typography component="h2" variant="h6">
                Step 3: Confirm details
            </Typography>

            <ConfirmDetails
                allocatedBoosterCountBySet={allocatedBoosterCountBySet}
                requiredBoosterCount={boosterRequirements.boosterCount}
                requiredTotalCardCount={boosterRequirements.totalCardCount}
            />

            <Divider />

            <Typography component="h2" variant="h6">
                Step 4: Generate boosters
            </Typography>

            <Button
                disabled={!Object.keys(allocatedBoosterCountBySet).length}
                onClick={
                    data.cards
                        ? () =>
                              setGeneratedBoosters(
                                  getBoosters(
                                      data.cards,
                                      allocatedBoosterCountBySet
                                  )
                              )
                        : undefined
                }
                variant="contained"
            >
                Generate boosters
            </Button>

            <Divider />

            <Typography component="h2" variant="h6">
                Step 5: Enjoy your boosters
            </Typography>

            <GeneratedBoosters generatedBoosters={generatedBoosters} />
        </Box>
    );
}
