import { Chip } from "@mui/material";

/**
 * Component for indicating a foil card.
 */
export function FoilChip() {
    return (
        <Chip
            color="secondary"
            label="F"
            sx={{
                height: (theme) => theme.spacing(2),
                span: {
                    padding: "4px",
                    paddingTop: "4px",
                    paddingBottom: "2px",
                },
            }}
        />
    );
}
