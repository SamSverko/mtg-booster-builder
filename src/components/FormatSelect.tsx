import {
    ToggleButton,
    ToggleButtonGroup,
    ToggleButtonGroupProps,
} from "@mui/material";

import { MTG } from "@/constants";
import { Format } from "@/types";

export type FormatSelectProps = {
    onChange: (format: Format) => void;
    format?: Format;
};

/**
 * Component for selecting a format.
 *
 * TODO - add format details?
 */
export function FormatSelect({ onChange, format }: FormatSelectProps) {
    const formatMap = new Map([
        [MTG.FORMAT_NONE.name, MTG.FORMAT_NONE],
        [MTG.FORMAT_BOOSTER_DRAFT.name, MTG.FORMAT_BOOSTER_DRAFT],
        [MTG.FORMAT_SEALED_DECK.name, MTG.FORMAT_SEALED_DECK],
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
            <ToggleButton value={MTG.FORMAT_NONE.name}>
                {MTG.FORMAT_NONE.name}
            </ToggleButton>
            <ToggleButton value={MTG.FORMAT_BOOSTER_DRAFT.name}>
                {MTG.FORMAT_BOOSTER_DRAFT.name}
            </ToggleButton>
            <ToggleButton value={MTG.FORMAT_SEALED_DECK.name}>
                {MTG.FORMAT_SEALED_DECK.name}
            </ToggleButton>
        </ToggleButtonGroup>
    );
}
