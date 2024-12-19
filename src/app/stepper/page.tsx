"use client";

import { Box, Button, Divider, Step, Stepper, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";

import {
    BoosterAllocation,
    CardImport,
    CardImportOnChangeEvent,
    ConfirmDetails,
    CountInput,
    CountInputOnChangeEvent,
    FormatSelect,
    StepContent,
    StepLabel,
} from "@/app/components";
import { FORMAT_NONE } from "@/app/constants";
import { AllocatedBoosterCountBySet, Format } from "@/app/types";

export default function Home() {
    const [activeStep, setActiveStep] = useState(0);

    const [cardData, setCardData] = useState<
        CardImportOnChangeEvent | undefined
    >(undefined);
    const [format, setFormat] = useState<Format | undefined>(undefined);
    const [playerOrBoosterCount, setPlayerOrBoosterCount] = useState(0);
    const [allocatedBoosterCountBySet, setAllocatedBoosterCountBySet] =
        useState<AllocatedBoosterCountBySet>({});

    const requiredBoosterCount = useMemo(() => {
        if (format?.boosterPerPlayerCount) {
            return playerOrBoosterCount * format.boosterPerPlayerCount;
        }

        return playerOrBoosterCount;
    }, [format, playerOrBoosterCount]);

    const totalAllocatedBoosters = useMemo(
        () =>
            Object.values(allocatedBoosterCountBySet).reduce(
                (acc, count) => acc + count,
                0
            ),
        [allocatedBoosterCountBySet]
    );

    // Reset playerOrBoosterCount when format changes
    useEffect(() => {
        setPlayerOrBoosterCount(0);
    }, [format]);

    // Reset allocatedBoosterCountBySet when playerOrBoosterCount changes
    useEffect(() => {
        setAllocatedBoosterCountBySet({});
    }, [playerOrBoosterCount]);

    const nextStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const prevStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const updatePlayerOrBoosterCount = (event: CountInputOnChangeEvent) => {
        switch (event) {
            case "decrement":
                setPlayerOrBoosterCount(Math.max(playerOrBoosterCount - 1, 1));
                break;
            case "increment":
                setPlayerOrBoosterCount(playerOrBoosterCount + 1);
                break;
            default:
                break;
        }
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            gap={2}
            m="0 auto"
            maxWidth="600px"
            p={1}
        >
            <Typography component="h1" variant="h5">
                MTG Booster Builder
            </Typography>

            <Divider />

            <Stepper activeStep={activeStep} orientation="vertical">
                <Step>
                    <StepLabel
                        chipLabel={
                            cardData
                                ? cardData.cards.length.toLocaleString()
                                : undefined
                        }
                        label="Import cards"
                    />
                    <StepContent
                        onNext={cardData?.cards.length ? nextStep : undefined}
                    >
                        <CardImport onChange={setCardData} />
                    </StepContent>
                </Step>
                <Step>
                    <StepLabel
                        chipLabel={format ? format.name : undefined}
                        label="Select format"
                    />
                    <StepContent
                        onBack={prevStep}
                        onNext={format ? nextStep : undefined}
                    >
                        <FormatSelect onChange={setFormat} value={format} />
                    </StepContent>
                </Step>
                <Step>
                    <StepLabel
                        chipLabel={
                            playerOrBoosterCount > 0
                                ? playerOrBoosterCount.toLocaleString()
                                : undefined
                        }
                        label={`Set ${
                            format?.name === FORMAT_NONE.name
                                ? "booster"
                                : "player"
                        } count`}
                    />
                    <StepContent onBack={prevStep} onNext={nextStep}>
                        <CountInput
                            onChange={updatePlayerOrBoosterCount}
                            value={playerOrBoosterCount}
                        />
                    </StepContent>
                </Step>
                <Step>
                    <StepLabel
                        chipLabel={
                            requiredBoosterCount > 0
                                ? `${totalAllocatedBoosters} of ${requiredBoosterCount}`
                                : undefined
                        }
                        label="Allocate boosters"
                    />
                    <StepContent
                        onBack={prevStep}
                        onNext={totalAllocatedBoosters ? nextStep : undefined}
                    >
                        <BoosterAllocation
                            allocatedBoosterCountBySet={
                                allocatedBoosterCountBySet
                            }
                            cardCountBySet={cardData?.cardCountBySet}
                            onChange={setAllocatedBoosterCountBySet}
                            requiredBoosterCount={requiredBoosterCount}
                            totalAllocatedBoosters={totalAllocatedBoosters}
                        />
                    </StepContent>
                </Step>
                <Step>
                    <StepLabel label="Generate boosters" />
                    <StepContent onBack={prevStep}>
                        <ConfirmDetails
                            allocatedBoosterCountBySet={
                                allocatedBoosterCountBySet
                            }
                            requiredBoosterCount={requiredBoosterCount}
                        />
                        <Button
                            disabled={
                                totalAllocatedBoosters < requiredBoosterCount
                            }
                            fullWidth
                            onClick={() => {
                                window.alert("COMING SOON I PROMISE 😭");
                            }}
                            variant="contained"
                        >
                            Generate boosters
                        </Button>
                    </StepContent>
                </Step>
            </Stepper>
        </Box>
    );
}
