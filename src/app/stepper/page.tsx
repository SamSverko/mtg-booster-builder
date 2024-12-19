"use client";

import { Box, Button, Divider, Step, Stepper, Typography } from "@mui/material";
import { useState } from "react";

import {
    CardImport,
    FormatSelect,
    StepContent,
    StepLabel,
} from "@/app/components";
import { OnChangeEvent } from "@/app/components/CardImport";
import { Format } from "@/app/types";

export default function Home() {
    const [activeStep, setActiveStep] = useState(0);

    const [cardData, setCardData] = useState<OnChangeEvent | undefined>(
        undefined
    );
    const [format, setFormat] = useState<Format | undefined>(undefined);

    const nextStep = () =>
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const prevStep = () =>
        setActiveStep((prevActiveStep) => prevActiveStep - 1);

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
                    <StepLabel label="Step 3" />
                    <StepContent onBack={prevStep} onNext={nextStep}>
                        <Typography>Step 3 Content</Typography>
                    </StepContent>
                </Step>
            </Stepper>
            {activeStep === 3 && (
                <Box>
                    <Typography>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Button
                        onClick={() => setActiveStep(0)}
                        sx={{ mt: 1, mr: 1 }}
                    >
                        Reset
                    </Button>
                </Box>
            )}
        </Box>
    );
}
