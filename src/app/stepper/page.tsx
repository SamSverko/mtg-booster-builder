"use client";

import {
    Alert,
    Box,
    Button,
    Chip,
    Divider,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    Typography,
    styled,
} from "@mui/material";
import { useState } from "react";

import { AppLink, CardImport } from "@/app/components";
import { OnChangeEvent } from "@/app/components/CardImport";

type StepNavigationProps = {
    disableBack?: boolean;
    disableNext?: boolean;
};

const StepLabelStyled = styled(StepLabel)(({ theme }) => ({
    ".MuiStepLabel-label": {
        display: "flex",
        alignItems: "center",
        gap: theme.spacing(1),
    },
}));

const StepContentStyled = styled(StepContent)(({ theme }) => ({
    ".MuiCollapse-wrapperInner": {
        display: "flex",
        flexDirection: "column",
        gap: theme.spacing(2),
        marginTop: theme.spacing(3),
    },
}));

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

    const StepCompleteChip = ({ label }: { label: string }) => {
        if (!label) return null;

        return (
            <Chip color="info" label={label} size="small" variant="outlined" />
        );
    };

    const StepNavigation = ({
        disableBack,
        disableNext,
    }: StepNavigationProps) => (
        <Box alignItems="center" display="flex" gap={2}>
            <Button
                disabled={disableBack}
                onClick={handleBack}
                variant="outlined"
            >
                Back
            </Button>
            <Button
                disabled={disableNext}
                onClick={handleNext}
                variant="contained"
            >
                Next
            </Button>
        </Box>
    );

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
                    <StepLabelStyled>
                        Import your cards
                        <StepCompleteChip
                            label={
                                cardData
                                    ? cardData.cards.length.toLocaleString()
                                    : ""
                            }
                        />
                    </StepLabelStyled>
                    <StepContentStyled
                        TransitionProps={{ unmountOnExit: false }}
                    >
                        <Alert severity="info">
                            At this time, only{" "}
                            <AppLink
                                appHref="manabox://"
                                href="https://apps.apple.com/us/app/manabox/id1460407674"
                            >
                                ManaBox
                            </AppLink>{" "}
                            export files (.csv) are supported.
                        </Alert>
                        <CardImport onChange={setCardData} />
                        <StepNavigation
                            disableBack
                            disableNext={
                                !cardData || cardData.cards.length === 0
                            }
                        />
                    </StepContentStyled>
                </Step>
                <Step>
                    <StepLabel>Step 2</StepLabel>
                    <StepContent>
                        <Typography>Step 2 Content</Typography>
                        <StepNavigation />
                    </StepContent>
                </Step>
                <Step>
                    <StepLabel>Step 3</StepLabel>
                    <StepContent>
                        <Typography>Step 3 Content</Typography>
                        <StepNavigation />
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
