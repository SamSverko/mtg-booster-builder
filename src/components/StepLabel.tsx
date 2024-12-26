import { Chip, StepLabel as StepLabelMUI } from "@mui/material";

type StepLabelProps = {
    chipLabel?: string;
    label: string;
};

/**
 * Component for a step label with an optional chip.
 */
export function StepLabel({ chipLabel, label }: StepLabelProps) {
    return (
        <StepLabelMUI
            sx={{
                ".MuiStepLabel-label": {
                    display: "flex",
                    alignItems: "center",
                    gap: (theme) => theme.spacing(1),
                },
                ".Mui-disabled .MuiChip-root": {
                    opacity: (theme) => theme.palette.action.disabledOpacity,
                },
            }}
        >
            {label}
            {chipLabel && (
                <Chip
                    color="info"
                    label={chipLabel}
                    size="small"
                    variant="outlined"
                />
            )}
        </StepLabelMUI>
    );
}
