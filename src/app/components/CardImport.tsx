import { Delete, FileUpload } from "@mui/icons-material";
import {
    Alert,
    Box,
    Button,
    IconButton,
    styled,
    Typography,
} from "@mui/material";
import Papa from "papaparse";
import { useCallback, useEffect, useRef, useState } from "react";

import { AppLink } from "@/app/components";
import { CardCountBySet, ManaBoxCard } from "@/app/types";

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

export type CardImportOnChangeEvent = {
    cards: ManaBoxCard[];
    cardCountBySet: CardCountBySet;
};

type CardImportProps = {
    onChange: (event: CardImportOnChangeEvent) => void;
};

/**
 * A component that allows users to upload a CSV file of cards.
 *
 * Supported: ManaBox export files (.csv).
 */
export default function CardImport({ onChange }: CardImportProps) {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [cardCount, setCardCount] = useState<number | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [parseError, setParseError] = useState<string | null>(null);

    const saveFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
        }
    };

    const deleteFile = () => {
        setFile(null);
        setCardCount(null);
        setParseError(null);

        if (inputRef.current) {
            inputRef.current.value = "";
        }

        onChange({ cards: [], cardCountBySet: {} });
    };

    const parseFile = useCallback(
        async (file: File) => {
            return Papa.parse<ManaBoxCard>(file, {
                complete: (results) => {
                    if (results.errors.length > 0) {
                        setParseError(results.errors[0].message);
                        return;
                    }

                    setCardCount(results.data.length);
                    onChange({
                        cards: results.data,
                        cardCountBySet: Object.fromEntries(
                            Object.entries(
                                results.data.reduce(
                                    (acc: CardCountBySet, card) => {
                                        if (!acc[card.setCode]) {
                                            acc[card.setCode] = 0;
                                        }
                                        acc[card.setCode]++;
                                        return acc;
                                    },
                                    {}
                                )
                            ).sort(([, countA], [, countB]) => countB - countA)
                        ),
                    });
                },
                dynamicTyping: true,
                error(error) {
                    setParseError(error.message);
                },
                header: true,
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
                role={undefined}
                startIcon={<FileUpload />}
                tabIndex={-1}
                variant={file ? "outlined" : "contained"}
            >
                {file ? "Re-" : ""}Upload file
                <HiddenInput
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
            <Box visibility={cardCount ? "visible" : "hidden"}>
                <Typography>
                    {cardCount ? cardCount?.toLocaleString() : ""} cards found.
                </Typography>
            </Box>
        </Box>
    );
}
