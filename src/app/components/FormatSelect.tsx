import {
    Box,
    InputLabel,
    ToggleButton,
    ToggleButtonGroup,
    ToggleButtonGroupProps,
} from "@mui/material";

import {
    FORMAT_BOOSTER_DRAFT,
    FORMAT_NONE,
    FORMAT_SEALED_DECK,
} from "@/app/constants";
import { Format } from "@/app/types";

type FormatSelectProps = {
    onChange: (format: Format) => void;
    value: Format;
};

// TODO - show format details?
export default function FormatSelect({ onChange, value }: FormatSelectProps) {
    const formatMap = new Map([
        [FORMAT_NONE.name, FORMAT_NONE],
        [FORMAT_BOOSTER_DRAFT.name, FORMAT_BOOSTER_DRAFT],
        [FORMAT_SEALED_DECK.name, FORMAT_SEALED_DECK],
    ]);

    const handleChange: ToggleButtonGroupProps["onChange"] = (_, value) => {
        const selectedFormat = formatMap.get(value);

        if (selectedFormat) {
            onChange(selectedFormat);
        }
    };

    return (
        <Box display="flex" flexDirection="column" gap={1}>
            <InputLabel>Format</InputLabel>
            <ToggleButtonGroup
                color="primary"
                exclusive
                fullWidth
                size="small"
                onChange={handleChange}
                value={value.name}
            >
                <ToggleButton value={FORMAT_NONE.name}>
                    {FORMAT_NONE.name}
                </ToggleButton>
                <ToggleButton value={FORMAT_BOOSTER_DRAFT.name}>
                    {FORMAT_BOOSTER_DRAFT.name}
                </ToggleButton>
                <ToggleButton value={FORMAT_SEALED_DECK.name}>
                    {FORMAT_SEALED_DECK.name}
                </ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
}
