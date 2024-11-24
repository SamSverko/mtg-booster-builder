import Papa from "papaparse";
import { useEffect, useState } from "react";

import { ManaBoxCard } from "@/app/types";

export default function useCards() {
    const [cards, setCards] = useState<ManaBoxCard[] | null>(null);
    const [isLoading, setIsLoading] = useState(true);

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const parsedData = await getLocalCardData();
                setCards(parsedData.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching or parsing the CSV data:", error);
            }
        };

        fetchData();
    }, []);

    return { cards, isLoading };
}
