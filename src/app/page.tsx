"use client";

import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    Box,
    Button,
    Divider,
    Typography,
} from "@mui/material";

import { useEffect, useMemo, useState } from "react";

import {
    BoosterAllocation,
    CardCount,
    ConfirmDetails,
    FormatSelect,
} from "@/app/components";
import { FORMAT_NONE, PLAY_BOOSTER } from "@/app/constants";
import { useCards } from "@/app/hooks";
import { CardCountBySet, Format, ManaBoxCard } from "@/app/types";
import { getBoosters } from "@/app/utils";

export default function Home() {
    const { data, isLoading } = useCards();

    const [format, setFormat] = useState<Format>(FORMAT_NONE);
    const [playerCount, setPlayerCount] = useState<number>(
        format.minPlayerCount || 1
    );
    const [allocatedBoosterCountBySet, setAllocatedBoosterCountBySet] =
        useState<CardCountBySet>({});
    const [generatedBoosters, setGeneratedBoosters] = useState<ManaBoxCard[][]>(
        []
    );

    const boosterRequirements = useMemo(() => {
        if (!format || !format.boosterPerPlayerCount) {
            return {
                boosterCount: playerCount,
                cardCountPerSet: playerCount * PLAY_BOOSTER.slots.length,
            };
        }

        const boosterCount = Math.ceil(
            playerCount * format.boosterPerPlayerCount
        );
        const cardCountPerSet = boosterCount * PLAY_BOOSTER.slots.length;

        return { boosterCount, cardCountPerSet };
    }, [format, playerCount]);

    // TODO - Use loading Skeletons instead?
    if (isLoading) {
        return (
            <Box
                display="flex"
                flexDirection="column"
                gap={2}
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
                gap={2}
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
            gap={2}
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

            <BoosterAllocation
                allocatedBoosterCountBySet={allocatedBoosterCountBySet}
                cardCountBySet={data.cardCountBySet}
                isLoading={isLoading}
                onChange={setAllocatedBoosterCountBySet}
                requiredBoosterCount={boosterRequirements.boosterCount}
                requiredCardCountPerSet={boosterRequirements.cardCountPerSet}
            />

            <Divider />

            <Typography component="h2" variant="h6">
                Step 3: Confirm details
            </Typography>

            {/* <ConfirmDetails
                boosterAllocation={boosterAllocation}
                boosterCount={boosterRequirements.boosterCount}
                cardCountPerSet={boosterRequirements.cardCountPerSet}
            /> */}

            <Divider />

            <Typography component="h2" variant="h6">
                Step 4: Generate boosters
            </Typography>

            {/* <Button
                disabled={boosterAllocation.length === 0}
                onClick={
                    data.cards
                        ? () =>
                              setGeneratedBoosters(
                                  getBoosters(data.cards, boosterAllocation)
                              )
                        : undefined
                }
                variant="contained"
            >
                Generate boosters
            </Button> */}

            <Divider />

            <Typography component="h2" variant="h6">
                Step 5: Enjoy your boosters
            </Typography>

            {/* <Box>
                {generatedBoosters.map((booster, index) => (
                    <Accordion key={index}>
                        <AccordionSummary
                            aria-controls={`booster-${index}-content`}
                            expandIcon={<ExpandMoreIcon />}
                            id={`booster-${index}-panel`}
                        >
                            Booster {index + 1} ({booster[0].setCode})
                        </AccordionSummary>
                        <AccordionDetails>
                            <ul>
                                {booster.map((card) => (
                                    <li key={card.scryfallID}>
                                        {card.collectorNumber} - {card.name}
                                        {card.foil === "foil" ? " (foil)" : ""}
                                    </li>
                                ))}
                            </ul>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box> */}
        </Box>
    );
}
