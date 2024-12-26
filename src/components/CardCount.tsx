import { Typography } from "@mui/material";

type CardCountProps = {
    cardCount?: number;
    isLoading?: boolean;
};

/**
 * Component for displaying the number of cards found.
 */
export function CardCount({ cardCount, isLoading }: CardCountProps) {
    const text = isLoading
        ? "Loading..."
        : cardCount === undefined
        ? "No cards found."
        : `${cardCount} cards found.`;

    return <Typography>{text}</Typography>;
}
