"use client";

import { Button, CircularProgress, Step, Stepper } from "@mui/material";
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
} from "@/components";
import { MTG } from "@/constants";
import { App, ManaBox, MTG as MTGType } from "@/types";
import { getSerializedBoostersUrl } from "@/utils";

export default function HomePage() {
    const router = useRouter();

    const [activeStep, setActiveStep] = useState(0);

    const [cardData, setCardData] = useState<App.CardData | undefined>(
        undefined
    );
    const [binderTypes, setBinderTypes] = useState<ManaBox.BinderType[]>([]);
    const [cardDataFiltered, setCardDataFiltered] = useState<
        App.CardData | undefined
    >(undefined);
    const [format, setFormat] = useState<MTGType.Format | undefined>(undefined);
    const [playerOrBoosterCount, setPlayerOrBoosterCount] = useState(0);
    const [allocatedBoosterCountBySet, setAllocatedBoosterCountBySet] =
        useState<App.AllocatedBoosterCountBySet>({});
    const [isGenerating, setIsGenerating] = useState(false);

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
                        format?.name === MTG.FORMAT_NONE.name
                            ? "booster"
                            : "player"
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
                        allocatedBoosterCountBySet={allocatedBoosterCountBySet}
                        cardCountBySet={cardDataFiltered?.cardCountBySet}
                        onChange={setAllocatedBoosterCountBySet}
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
                        allocatedBoosterCountBySet={allocatedBoosterCountBySet}
                        requiredBoosterCount={requiredBoosterCount}
                    />
                    <Button
                        disabled={
                            isGenerating ||
                            totalAllocatedBoosters < requiredBoosterCount
                        }
                        fullWidth
                        onClick={() => {
                            setIsGenerating(true);

                            const serializedBoostersUrl =
                                getSerializedBoostersUrl(
                                    cardDataFiltered?.cards,
                                    allocatedBoosterCountBySet
                                );

                            if (serializedBoostersUrl) {
                                router.push(serializedBoostersUrl);
                            }
                        }}
                        startIcon={
                            isGenerating && <CircularProgress size={20} />
                        }
                        variant="contained"
                    >
                        {isGenerating ? "Generating" : "Generate"} boosters
                    </Button>
                </StepContent>
            </Step>
        </Stepper>
    );
}
