import {
    FORMAT_BOOSTER_DRAFT,
    FORMAT_NONE,
    FORMAT_SEALED_DECK,
} from "@/app/constants";
import { Format } from "@/app/types";
import {
    Box,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectProps,
} from "@mui/material";

type FormatSelectProps = {
    onChange: (format: Format) => void;
    value: Format;
    id?: string;
};

export default function FormatSelect({
    id = "format-select-label",
    onChange,
    value,
}: FormatSelectProps) {
    const label = "Format";
    const formatMap = new Map([
        [FORMAT_NONE.name, FORMAT_NONE],
        [FORMAT_BOOSTER_DRAFT.name, FORMAT_BOOSTER_DRAFT],
        [FORMAT_SEALED_DECK.name, FORMAT_SEALED_DECK],
    ]);

    const handleChange: SelectProps["onChange"] = (event) => {
        const value = event.target.value;

        if (typeof value !== "string") return;

        const selectedFormat = formatMap.get(value) || FORMAT_NONE;
        onChange(selectedFormat);
    };

    return (
        <FormControl>
            <InputLabel id={`${id}-label`}>{label}</InputLabel>
            <Select
                id={id}
                label={label}
                labelId={`${id}-label`}
                onChange={handleChange}
                size="small"
                value={value.name}
            >
                {[FORMAT_NONE, FORMAT_BOOSTER_DRAFT, FORMAT_SEALED_DECK].map(
                    (format) => (
                        <MenuItem key={format.name} value={format.name}>
                            {format.name}
                        </MenuItem>
                    )
                )}
            </Select>
        </FormControl>
    );
}
