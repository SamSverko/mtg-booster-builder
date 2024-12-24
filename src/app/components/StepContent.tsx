import { Box, Button, StepContent as StepContentMUI } from "@mui/material";

type StepContentProps = {
    children: React.ReactNode | React.ReactNode[];
    hideBack?: boolean;
    hideNext?: boolean;
    onBack?: () => void;
    onNext?: () => void;
};

/**
 * A wrapper around MUI's StepContent component that adds a back and next button.
 */
export function StepContent({
    children,
    hideBack,
    hideNext,
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
                    sx={{
                        visibility: hideBack ? "hidden" : "visible",
                    }}
                    variant="outlined"
                >
                    Back
                </Button>
                <Button
                    disabled={!onNext}
                    fullWidth
                    onClick={onNext}
                    sx={{
                        visibility: hideNext ? "hidden" : "visible",
                    }}
                    variant="contained"
                >
                    Next
                </Button>
            </Box>
        </StepContentMUI>
    );
}
