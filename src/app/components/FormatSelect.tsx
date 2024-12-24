import {
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

export type FormatSelectProps = {
    onChange: (format: Format) => void;
    format?: Format;
};

// TODO - show format details?
export default function FormatSelect({ onChange, format }: FormatSelectProps) {
    const formatMap = new Map([
        [FORMAT_NONE.name, FORMAT_NONE],
        [FORMAT_BOOSTER_DRAFT.name, FORMAT_BOOSTER_DRAFT],
        [FORMAT_SEALED_DECK.name, FORMAT_SEALED_DECK],
    ]);

    const handleChange: ToggleButtonGroupProps["onChange"] = (_, format) => {
        const selectedFormat = formatMap.get(format);

        if (selectedFormat) {
            onChange(selectedFormat);
        }
    };

    return (
        <ToggleButtonGroup
            color="primary"
            exclusive
            fullWidth
            size="small"
            onChange={handleChange}
            value={format?.name}
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
    );
}
