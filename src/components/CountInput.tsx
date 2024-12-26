import {
    KeyboardDoubleArrowLeft,
    KeyboardArrowLeft,
    KeyboardDoubleArrowRight,
    KeyboardArrowRight,
} from "@mui/icons-material";
import { Box, IconButton, InputLabel, Typography } from "@mui/material";

export type CountInputOnChangeEvent =
    | "decrement-all"
    | "decrement"
    | "increment"
    | "increment-all";

export type CountInputProps = {
    disableDecrementAll?: boolean;
    disableDecrement?: boolean;
    disableIncrement?: boolean;
    disableIncrementAll?: boolean;
    onChange: (event: CountInputOnChangeEvent) => void;
    value: number;
    label?: string;
    showAllControls?: boolean;
};

/**
 * Component for incrementing and decrementing a count.
 */
export function CountInput({
    disableDecrementAll = false,
    disableDecrement = false,
    disableIncrement = false,
    disableIncrementAll = false,
    label,
    onChange,
    showAllControls = false,
    value,
}: CountInputProps) {
    return (
        <Box display="flex" flexDirection="column" gap={1}>
            {label && <InputLabel>{label}</InputLabel>}
            <Box
                border={(theme) => `1px solid ${theme.palette.grey[300]}`}
                borderRadius={"4px"}
                alignItems="center"
                display="flex"
                p="2px"
                gap={1}
                width="fit-content"
            >
                <Box display="flex" flexWrap="nowrap">
                    {showAllControls && (
                        <IconButton
                            disabled={disableDecrementAll}
                            onClick={() => onChange("decrement-all")}
                            size="small"
                        >
                            <KeyboardDoubleArrowLeft />
                        </IconButton>
                    )}
                    <IconButton
                        disabled={disableDecrement}
                        onClick={() => onChange("decrement")}
                        size="small"
                    >
                        <KeyboardArrowLeft />
                    </IconButton>
                </Box>
                <Typography
                    color={
                        disableDecrementAll &&
                        disableDecrement &&
                        disableIncrement &&
                        disableIncrementAll
                            ? "text.disabled"
                            : "text.primary"
                    }
                    sx={{
                        userSelect: "none",
                    }}
                    textAlign="center"
                    width="2ch"
                >
                    {value}
                </Typography>
                <Box display="flex" flexWrap="nowrap">
                    <IconButton
                        disabled={disableIncrement}
                        onClick={() => onChange("increment")}
                        size="small"
                    >
                        <KeyboardArrowRight />
                    </IconButton>
                    {showAllControls && (
                        <IconButton
                            disabled={disableIncrementAll}
                            onClick={() => onChange("increment-all")}
                            size="small"
                        >
                            <KeyboardDoubleArrowRight />
                        </IconButton>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
