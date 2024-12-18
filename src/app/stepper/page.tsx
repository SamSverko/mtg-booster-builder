"use client";

import {
    Box,
    Button,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    Typography,
} from "@mui/material";
import { useState } from "react";

import { CardImport } from "@/app/components";
import { OnChangeEvent } from "@/app/components/CardImport";

export default function Home() {
    const [activeStep, setActiveStep] = useState(0);

    const [cardData, setCardData] = useState<OnChangeEvent | null>(null);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    console.log("cardData", cardData);

    return (
        <Box>
            <Typography component="h1" variant="h5">
                MTG Booster Builder
            </Typography>

            <Stepper activeStep={activeStep} orientation="vertical">
                <Step>
                    <StepLabel>Import your cards</StepLabel>
                    <StepContent>
                        <CardImport onChange={setCardData} />

                        <Button onClick={handleNext}>Next</Button>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                        >
                            Back
                        </Button>
                    </StepContent>
                </Step>
                <Step>
                    <StepLabel>Step 2</StepLabel>
                    <StepContent>
                        <Typography>Step 2 Content</Typography>
                        <Button onClick={handleNext}>Next</Button>
                        <Button onClick={handleBack}>Back</Button>
                    </StepContent>
                </Step>
                <Step>
                    <StepLabel>Step 3</StepLabel>
                    <StepContent>
                        <Typography>Step 3 Content</Typography>
                        <Button onClick={handleNext}>Finish</Button>
                        <Button onClick={handleBack}>Back</Button>
                    </StepContent>
                </Step>
            </Stepper>
            {activeStep === 3 && (
                <Box>
                    <Typography>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                    </Button>
                </Box>
            )}
        </Box>
    );
}
