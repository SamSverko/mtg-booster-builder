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

    return (
        <div>
            <p>{text}</p>
        </div>
    );
}
