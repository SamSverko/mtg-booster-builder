import { Chip, StepLabel as StepLabelMUI } from "@mui/material";

type StepLabelProps = {
    chipLabel?: string;
    label: string;
};

/**
 * A wrapper around MUI's StepLabel component that adds a chip label.
 */
export default function StepLabel({ chipLabel, label }: StepLabelProps) {
    return (
        <StepLabelMUI
            sx={{
                ".MuiStepLabel-label": {
                    display: "flex",
                    alignItems: "center",
                    gap: (theme) => theme.spacing(1),
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
