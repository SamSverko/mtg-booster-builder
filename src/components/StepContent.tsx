import { Box, Button, StepContent as StepContentMUI } from "@mui/material";

type StepContentProps = {
    children: React.ReactNode | React.ReactNode[];
    hideBack?: boolean;
    hideNext?: boolean;
    onBack?: () => void;
    onNext?: () => void;
};

/**
 * Component for displaying step content.
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
