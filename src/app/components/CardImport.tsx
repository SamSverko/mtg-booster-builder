import { Delete, FileUpload } from "@mui/icons-material";
import { Box, Button, IconButton, styled, Typography } from "@mui/material";
import Papa from "papaparse";
import { use, useCallback, useEffect, useRef, useState } from "react";

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

export type OnChangeEvent = {
    cards: ManaBoxCard[];
    cardCountBySet: CardCountBySet;
};

type CardImportProps = {
    onChange: (event: OnChangeEvent) => void;
};

// TODO - handle file error
export default function CardImport({ onChange }: CardImportProps) {
    const [file, setFile] = useState<File | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const saveFile = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            setFile(files[0]);
        }
    };

    const deleteFile = () => {
        setFile(null);
        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    const parseFile = useCallback(
        async (file: File) => {
            return Papa.parse<ManaBoxCard>(file, {
                complete: (results, file) => {
                    console.log("Parsing complete:", results, file);
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
            <Button
                component="label"
                role={undefined}
                startIcon={<FileUpload />}
                tabIndex={-1}
                variant="contained"
            >
                Upload files
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
        </Box>
    );
}
