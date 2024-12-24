import { Chip } from "@mui/material";

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