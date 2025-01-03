import { Delete, FileUpload } from "@mui/icons-material";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    IconButton,
    styled,
    Typography,
} from "@mui/material";
import Papa from "papaparse";
import { useCallback, useEffect, useRef, useState } from "react";

import { AppLink } from "@/components";
import { type Card } from "@/types";
import {
    getCardCount,
    getCardCountBySetCode,
    type CardCountBySetCode,
} from "@/utils";

const HiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

export type CardImportData = {
    cards: Card[];
    cardCount: number;
    cardCountBySetCode: CardCountBySetCode;
};

export type CardImportProps = {
    onChange: (event: CardImportData) => void;
};

/**
 * Component for importing cards from a file.
 *
 * Supported: ManaBox export files (.csv).
 */
export function CardImport({ onChange }: CardImportProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [cardCount, setCardCount] = useState<number | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [parseError, setParseError] = useState<string | null>(null);

    const saveFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsLoading(true);
        const files = event.target.files;

        if (files && files.length > 0) {
            const uploadedFile = files[0];

            if (!uploadedFile.name.endsWith(".csv")) {
                setParseError("Only .csv files are allowed.");
                setIsLoading(false);
                return;
            }

            setFile(uploadedFile);
            setParseError(null);
        } else {
            setIsLoading(false);
            setParseError("No file selected.");
        }
    };

    const deleteFile = () => {
        setFile(null);
        setCardCount(null);
        setParseError(null);

        if (inputRef.current) {
            inputRef.current.value = "";
        }

        onChange({ cards: [], cardCount: 0, cardCountBySetCode: {} });
    };

    const parseFile = useCallback(
        (file: File) => {
            Papa.parse<Card>(file, {
                header: true,
                complete: (results) => {
                    setIsLoading(false);

                    if (results.errors.length > 0) {
                        setParseError(
                            results.errors
                                .map((error) => error.message)
                                .join(", ")
                        );
                        setCardCount(null);
                        return;
                    }

                    const cards = results.data;
                    const cardCount = getCardCount(cards);
                    const cardCountBySetCode = getCardCountBySetCode(cards);

                    setParseError(null);
                    setCardCount(cardCount);
                    onChange({ cards, cardCount, cardCountBySetCode });
                },
                dynamicTyping: true,
                error: (error) => {
                    setIsLoading(false);
                    setParseError(error.message);
                },
                skipEmptyLines: true,
                transformHeader(header) {
                    return header
                        .split(" ")
                        .map((word, index) =>
                            index === 0
                                ? word.charAt(0).toLowerCase() + word.slice(1)
                                : word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join("");
                },
            });
        },
        [onChange]
    );

    useEffect(() => {
        if (file) {
            parseFile(file);
        }
    }, [file, parseFile]);

    const resultsText = () => {
        if (cardCount) {
            return `${cardCount.toLocaleString()} cards found.`;
        }

        if (parseError) {
            return "Parsing error occurred, please check your file.";
        }

        return "No file uploaded";
    };

    return (
        <Box
            alignItems="flex-start"
            display="flex"
            flexDirection="column"
            gap={2}
        >
            <Alert severity="info">
                At this time, only{" "}
                <AppLink
                    appHref="manabox://"
                    href="https://apps.apple.com/us/app/manabox/id1460407674"
                >
                    ManaBox
                </AppLink>{" "}
                export files (.csv) are supported.
            </Alert>
            <Button
                component="label"
                disabled={isLoading}
                fullWidth
                role={undefined}
                startIcon={
                    isLoading ? <CircularProgress size={20} /> : <FileUpload />
                }
                tabIndex={-1}
                variant={file ? "outlined" : "contained"}
            >
                {isLoading ? "Uploading..." : `${file ? "Re-" : ""}Upload file`}
                <HiddenInput
                    aria-label="Upload CSV file"
                    onChange={saveFile}
                    ref={inputRef}
                    type="file"
                    accept=".csv"
                />
            </Button>
            <Box
                alignItems="center"
                display="flex"
                gap={1}
                visibility={file ? "visible" : "hidden"}
                maxWidth="100%"
            >
                <Box overflow="auto">
                    <Typography whiteSpace="nowrap">
                        {file ? file.name : "No file uploaded"}
                    </Typography>
                </Box>
                <IconButton onClick={deleteFile} size="small">
                    <Delete />
                </IconButton>
            </Box>
            <Typography display={parseError ? "block" : "none"} color="error">
                {parseError}
            </Typography>
            <Box visibility={cardCount || parseError ? "visible" : "hidden"}>
                <Typography>{resultsText()}</Typography>
            </Box>
        </Box>
    );
}
