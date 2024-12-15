import { Box, Typography } from "@mui/material";

type CardCountProps = {
    cardCount?: number;
    isLoading?: boolean;
};

export default function CardCount({ cardCount, isLoading }: CardCountProps) {
    const text = isLoading
        ? "Loading..."
        : cardCount === undefined
        ? "No cards found."
        : `${cardCount} cards found.`;

    return <Typography>{text}</Typography>;
}
