import { Format } from "@/app/types";

import styles from "@/app/components/PlayerCountInput.module.scss";

type PlayerCountInputProps = {
    "aria-labelledby": string;
    format: Format;
    onChange: (playerCount: number) => void;
    value: number;
};

export default function PlayerCountInput({
    "aria-labelledby": ariaLabelledby,
    format,
    onChange,
    value,
}: PlayerCountInputProps) {
    return (
        <div>
            <input
                aria-labelledby={ariaLabelledby}
                className={styles.numberInput}
                max={format.maxPlayerCount ?? Infinity}
                min={format.minPlayerCount}
                onChange={(event) => onChange(Number(event.target.value))}
                type="number"
                value={value}
            />
        </div>
    );
}
