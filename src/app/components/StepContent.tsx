import { Box, Button, StepContent as StepContentMUI } from "@mui/material";

type StepContentProps = {
    children: React.ReactNode | React.ReactNode[];
    onBack?: () => void;
    onNext?: () => void;
};

/**
 * A wrapper around MUI's StepContent component that adds a back and next button.
 */
export default function StepContent({
    children,
    onBack,
    onNext,
}: StepContentProps) {
    return (
        <StepContentMUI
            sx={{
                ".MuiCollapse-wrapperInner": {
                    display: "flex",
                    flexDirection: "column",
                    gap: (theme) => theme.spacing(2),
                    marginTop: (theme) => theme.spacing(3),
                },
            }}
            TransitionProps={{ unmountOnExit: false }}
        >
            {children}
            <Box alignItems="center" display="flex" gap={2}>
                <Button
                    disabled={!onBack}
                    fullWidth
                    onClick={onBack}
                    variant="outlined"
                >
                    Back
                </Button>
                <Button
                    disabled={!onNext}
                    fullWidth
                    onClick={onNext}
                    variant="contained"
                >
                    Next
                </Button>
            </Box>
        </StepContentMUI>
    );
}
