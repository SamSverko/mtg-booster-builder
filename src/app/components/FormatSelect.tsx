import {
    FORMAT_BOOSTER_DRAFT,
    FORMAT_NONE,
    FORMAT_SEALED_DECK,
} from "@/app/constants";
import { Format } from "@/app/types";

type FormatSelectProps = {
    "aria-labelledby": string;
    onChange: (format: Format) => void;
    value: Format;
};

export default function FormatSelect({
    "aria-labelledby": ariaLabelledby,
    onChange,
    value,
}: FormatSelectProps) {
    const formatMap = new Map([
        [FORMAT_NONE.name, FORMAT_NONE],
        [FORMAT_BOOSTER_DRAFT.name, FORMAT_BOOSTER_DRAFT],
        [FORMAT_SEALED_DECK.name, FORMAT_SEALED_DECK],
    ]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFormat = formatMap.get(event.target.value) || FORMAT_NONE;
        onChange(selectedFormat);
    };

    return (
        <select
            aria-labelledby={ariaLabelledby}
            onChange={handleChange}
            value={value.name}
        >
            {[FORMAT_NONE, FORMAT_BOOSTER_DRAFT, FORMAT_SEALED_DECK].map(
                (format) => (
                    <option key={format.name} value={format.name}>
                        {format.name}
                    </option>
                )
            )}
        </select>
    );
}
