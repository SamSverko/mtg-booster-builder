"use client";

import { ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    Button,
    Divider,
    Typography,
} from "@mui/material";

import { useMemo, useState } from "react";

import {
    BoosterAllocation,
    CardCount,
    ConfirmDetails,
    FormatSelect,
    CountInput,
} from "@/app/components";
import { FORMAT_NONE, PLAY_BOOSTER } from "@/app/constants";
import { useCards } from "@/app/hooks";
import { Format, ManaBoxCard, SetCodeWithCardCount } from "@/app/types";
import { getBoosters } from "@/app/utils";

export default function Home() {
    const { data, isLoading } = useCards();

    const [format, setFormat] = useState<Format>(FORMAT_NONE);
    const [playerCount, setPlayerCount] = useState<number>(
        format.minPlayerCount || 1
    );
    const [boosterAllocation, setBoosterAllocation] = useState<
        SetCodeWithCardCount[]
    >([]);
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
            {/* TODO - make this an input so you can upload your .csv file */}
            <CardCount cardCount={data.cards?.length} isLoading={isLoading} />

            <Divider />

            <Typography component="h2" variant="h6">
                Step 2: Choose your setup
            </Typography>

            <FormatSelect onChange={setFormat} value={format} />

            <CountInput
                label={`Number of ${
                    format?.name === FORMAT_NONE.name ? "boosters" : "players"
                }`}
                onChange={setPlayerCount}
                value={playerCount}
            />

            <Typography component="h3">Set(s)</Typography>

            <BoosterAllocation
                boosterCount={boosterRequirements.boosterCount}
                cardCountPerSet={boosterRequirements.cardCountPerSet}
                format={format}
                isLoading={isLoading}
                onChange={setBoosterAllocation}
                playerCount={playerCount}
                setCodesWithCardCount={data?.setCodesWithCardCount || []}
                value={boosterAllocation}
            />

            <Divider />

            <Typography component="h2" variant="h6">
                Step 3: Confirm details
            </Typography>

            <ConfirmDetails
                boosterAllocation={boosterAllocation}
                boosterCount={boosterRequirements.boosterCount}
                cardCountPerSet={boosterRequirements.cardCountPerSet}
            />

            <Divider />

            <Typography component="h2" variant="h6">
                Step 4: Generate boosters
            </Typography>

            {/* TODO - make this its own component */}
            <Button
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
            </Button>

            {/* TODO - add error (or lack of) feedback here */}

            <Divider />

            <Typography component="h2" variant="h6">
                Step 5: Enjoy your boosters
            </Typography>

            {/* TODO - save to local host for safe-refreshing! */}
            {/* TODO - allow sort by collectorNumber */}
            {/* TODO - add ability for user to check that they've gathered the cards */}
            {/* TODO - make this its own component */}
            <Box>
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
            </Box>
        </Box>
    );
}
