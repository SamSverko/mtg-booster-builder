import {
    KeyboardDoubleArrowLeft,
    KeyboardArrowLeft,
    KeyboardDoubleArrowRight,
    KeyboardArrowRight,
} from "@mui/icons-material";
import { Box, IconButton, InputLabel, Typography } from "@mui/material";

type CountInputProps = {
    onChange: (count: number) => void;
    value: number;
    label?: string;
    max?: number;
    min?: number;
    showAllControls?: boolean;
};

export default function CountInput({
    label,
    max,
    min = 1,
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
                <Box>
                    {showAllControls && (
                        <IconButton
                            disabled={value <= min}
                            onClick={() => onChange(min)}
                            size="small"
                        >
                            <KeyboardDoubleArrowLeft />
                        </IconButton>
                    )}
                    <IconButton
                        disabled={value <= min}
                        onClick={() => onChange(value - 1)}
                        size="small"
                    >
                        <KeyboardArrowLeft />
                    </IconButton>
                </Box>
                <Typography
                    sx={{
                        userSelect: "none",
                    }}
                    textAlign="center"
                    width="2ch"
                >
                    {value}
                </Typography>
                <Box>
                    <IconButton
                        onClick={() => onChange(value + 1)}
                        size="small"
                    >
                        <KeyboardArrowRight />
                    </IconButton>
                    {showAllControls && (
                        <IconButton
                            disabled={!max || value >= max}
                            onClick={() => {
                                if (max) onChange(max);
                            }}
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
