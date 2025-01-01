"use client";

import { Alert, Button, CircularProgress, Step, Stepper } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import {
    BoosterAllocation,
    CardImport,
    ConfirmDetails,
    CountInput,
    CountInputOnChangeEvent,
    FilterCards,
    FormatSelect,
    StepContent,
    StepLabel,
    type CardImportData,
} from "@/components";
import { FORMAT_NONE } from "@/constants";
import { type BinderType, type Format } from "@/types";
import {
    generateBoosters,
    serializeBoosters,
    type CardCountBySetCode,
} from "@/utils";

export default function HomePage() {
    const router = useRouter();

    const [activeStep, setActiveStep] = useState(0);

    const [cardData, setCardData] = useState<CardImportData | undefined>(
        undefined
    );
    const [binderTypes, setBinderTypes] = useState<BinderType[]>([]);
    const [cardDataFiltered, setCardDataFiltered] = useState<
        CardImportData | undefined
    >(undefined);
    const [format, setFormat] = useState<Format | undefined>(undefined);
    const [playerOrBoosterCount, setPlayerOrBoosterCount] = useState(0);
    const [allocatedBoosterCountBySetCode, setAllocatedBoosterCountBySetCode] =
        useState<CardCountBySetCode>({});
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationErrors, setGenerationErrors] = useState<string[]>([]);

    const requiredBoosterCount = useMemo(() => {
        if (format?.boosterPerPlayerCount) {
            return playerOrBoosterCount * format.boosterPerPlayerCount;
        }

        return playerOrBoosterCount;
    }, [format, playerOrBoosterCount]);

    const totalAllocatedBoosters = useMemo(
        () =>
            Object.values(allocatedBoosterCountBySetCode).reduce(
                (acc, count) => acc + count,
                0
            ),
        [allocatedBoosterCountBySetCode]
    );

    // Reset playerOrBoosterCount when format changes
    useEffect(() => {
        setPlayerOrBoosterCount(0);
    }, [format]);

    // Reset allocatedBoosterCountBySetCode when playerOrBoosterCount changes
    useEffect(() => {
        setAllocatedBoosterCountBySetCode({});
    }, [playerOrBoosterCount]);

    const nextStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const prevStep = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const updatePlayerOrBoosterCount = (event: CountInputOnChangeEvent) => {
        setPlayerOrBoosterCount((prevCount) => {
            if (event === "decrement") return Math.max(prevCount - 1, 1);
            if (event === "increment") return prevCount + 1;
            return prevCount;
        });
    };

    return (
        <Stepper activeStep={activeStep} orientation="vertical">
            <Step>
                <StepLabel
                    chipLabel={
                        cardData && cardData.cardCount
                            ? `${cardData.cardCount.toLocaleString()} total`
                            : undefined
                    }
                    label="Import cards"
                />
                <StepContent
                    hideBack
                    onNext={cardData?.cards.length ? nextStep : undefined}
                >
                    <CardImport onChange={setCardData} />
                </StepContent>
            </Step>
            <Step>
                <StepLabel
                    chipLabel={
                        binderTypes.length && cardDataFiltered
                            ? `${cardDataFiltered.cardCount.toLocaleString()} (${binderTypes.join(
                                  " + "
                              )})`
                            : undefined
                    }
                    label="Filter cards"
                />
                <StepContent
                    onBack={prevStep}
                    onNext={
                        cardDataFiltered?.cards.length ? nextStep : undefined
                    }
                >
                    <FilterCards
                        binderTypes={binderTypes}
                        cards={cardData?.cards}
                        onChange={(binderTypes, cardDataFiltered) => {
                            {
                                setBinderTypes(binderTypes);
                                setCardDataFiltered(cardDataFiltered);
                            }
                        }}
                    />
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
                    <FormatSelect onChange={setFormat} format={format} />
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
                        format?.name === FORMAT_NONE.name ? "booster" : "player"
                    } count`}
                />
                <StepContent
                    onBack={prevStep}
                    onNext={playerOrBoosterCount > 0 ? nextStep : undefined}
                >
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
                        allocatedBoosterCountBySetCode={
                            allocatedBoosterCountBySetCode
                        }
                        cardCountBySetCode={
                            cardDataFiltered?.cardCountBySetCode
                        }
                        onChange={setAllocatedBoosterCountBySetCode}
                        requiredBoosterCount={requiredBoosterCount}
                        totalAllocatedBoosters={totalAllocatedBoosters}
                    />
                </StepContent>
            </Step>
            <Step>
                <StepLabel label="Generate boosters" />
                <StepContent
                    hideNext
                    onBack={!isGenerating ? prevStep : undefined}
                >
                    <ConfirmDetails
                        allocatedBoosterCountBySetCode={
                            allocatedBoosterCountBySetCode
                        }
                        requiredBoosterCount={requiredBoosterCount}
                    />
                    <Button
                        disabled={
                            isGenerating ||
                            totalAllocatedBoosters < requiredBoosterCount
                        }
                        fullWidth
                        onClick={() => {
                            setGenerationErrors([]);
                            setIsGenerating(true);

                            if (!cardDataFiltered?.cards) return;

                            const generatedBoosters = generateBoosters({
                                allocatedBoosterCountBySetCode,
                                cards: cardDataFiltered?.cards,
                            });

                            if (generatedBoosters.errors.length) {
                                setGenerationErrors(generatedBoosters.errors);
                                setIsGenerating(false);
                                return;
                            }

                            const serializedBoosters = serializeBoosters(
                                generatedBoosters.boosters
                            );

                            router.push(
                                `/boosters/?serializedBoosters=${serializedBoosters}`
                            );

                            setIsGenerating(false);
                        }}
                        startIcon={
                            isGenerating && <CircularProgress size={20} />
                        }
                        variant="contained"
                    >
                        {isGenerating ? "Generating" : "Generate"} boosters
                    </Button>
                    {generationErrors.map((error, index) => (
                        <Alert key={index} severity="error">
                            {error}
                        </Alert>
                    ))}
                </StepContent>
            </Step>
        </Stepper>
    );
}
