import Papa from "papaparse";
import { useEffect, useMemo, useState } from "react";

import { ManaBoxCard, SetCodeWithCardCount } from "@/app/types";

export default function useCards() {
    const [cards, setCards] = useState<ManaBoxCard[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const getLocalCardData = async () => {
        const response = await fetch("/cards.csv");

        if (!response.ok) {
            throw new Error("Failed to load the CSV file.");
        }

        const csvFile = await response.text();

        return Papa.parse<ManaBoxCard>(csvFile, {
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
    };

    const setCodesWithCardCount = useMemo<SetCodeWithCardCount[]>(
        () =>
            Object.entries(
                (cards || []).reduce((acc: { [key: string]: number }, card) => {
                    if (!acc[card.setCode]) {
                        acc[card.setCode] = 0;
                    }
                    acc[card.setCode]++;
                    return acc;
                }, {})
            )
                .sort(([, countA], [, countB]) => countB - countA)
                .map(([setCode, count]) => ({
                    setCode,
                    count,
                    allocatedBoosterCount: 0,
                })),
        [cards]
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const parsedData = await getLocalCardData();
                setCards(parsedData.data);
            } catch (error) {
                console.error("Error fetching or parsing the CSV data:", error);
                setError("Failed to load or parse card data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    return {
        data: {
            cards,
            setCodesWithCardCount: setCodesWithCardCount
                .sort((a, b) => b.count - a.count)
                .map(({ setCode, count }) => ({
                    setCode,
                    count,
                    allocatedBoosterCount: 0,
                })),
        },
        isLoading,
        error,
    };
}
