import { getCardsMap } from "@/utils";
import { generateMockCards } from "@/utils/test-utils";

describe("getCardsMap", () => {
    it("should handle empty input", () => {
        const cards = generateMockCards({ count: 0 });
        const cardsMap = getCardsMap(cards);

        expect(cardsMap.size).toBe(0);
    });

    it("should create a map with the correct number of unique entries", () => {
        const cards = generateMockCards({
            count: 3,
            cardProps: [
                { quantity: 1, setCode: "set1" },
                { quantity: 2, setCode: "set2" },
                { quantity: 3, setCode: "set3" },
            ],
        });

        const cardsMap = getCardsMap(cards);

        // Verify the map size matches the number of unique scryfallIDs
        expect(cardsMap.size).toBe(cards.length);

        // Dynamically verify the entries
        let totalEntries = 0;
        cardsMap.forEach((cardList, scryfallID) => {
            const matchingCard = cards.find(
                (card) => card.scryfallID === scryfallID
            );
            expect(matchingCard).toBeDefined();

            // Check that the number of cards in the map matches the quantity
            expect(cardList.length).toBe(matchingCard?.quantity);

            // Ensure all cards in the list have quantity 1
            cardList.forEach((card) => {
                expect(card.quantity).toBe(1);
            });

            totalEntries += cardList.length;
        });

        // Verify the total number of cards in the map matches the sum of all quantities
        const expectedTotalEntries = cards.reduce(
            (sum, card) => sum + card.quantity,
            0
        );
        expect(totalEntries).toBe(expectedTotalEntries);
    });

    it("should correctly split card quantities into individual entries", () => {
        const cards = generateMockCards({
            count: 1,
            cardProps: [{ quantity: 5, setCode: "set1" }],
        });

        const cardsMap = getCardsMap(cards);

        // Verify the map size
        expect(cardsMap.size).toBe(1); // One unique scryfallID

        cardsMap.forEach((cardList) => {
            // Check that the number of cards in the list matches the original quantity
            expect(cardList.length).toBe(5);

            // Verify each card has quantity 1
            cardList.forEach((card) => {
                expect(card.quantity).toBe(1);
            });
        });
    });

    it("should correctly handle duplicate scryfallIDs with different quantities", () => {
        const cards = generateMockCards({
            count: 2,
            cardProps: [
                { quantity: 3, setCode: "set1" },
                { quantity: 2, setCode: "set2" },
            ],
        });

        cards[1].scryfallID = cards[0].scryfallID; // Duplicate scryfallID

        const cardsMap = getCardsMap(cards);

        // Verify the map size (only one unique scryfallID)
        expect(cardsMap.size).toBe(1);

        cardsMap.forEach((cardList, scryfallID) => {
            const totalQuantity = cards
                .filter((card) => card.scryfallID === scryfallID)
                .reduce((sum, card) => sum + card.quantity, 0);

            // Check the total number of entries matches the combined quantity
            expect(cardList.length).toBe(totalQuantity);

            // Verify each card has quantity 1
            cardList.forEach((card) => {
                expect(card.quantity).toBe(1);
            });
        });
    });

    it("should correctly process a large number of cards", () => {
        const cards = generateMockCards({
            count: 1000,
            cardProps: [
                { quantity: 10, setCode: "set1" },
                { quantity: 20, setCode: "set2" },
            ],
        });

        const cardsMap = getCardsMap(cards);

        // Dynamically calculate the total expected entries
        const expectedTotalEntries = cards.reduce(
            (sum, card) => sum + card.quantity,
            0
        );

        // Verify all entries dynamically
        let totalEntries = 0;
        cardsMap.forEach((cardList) => {
            totalEntries += cardList.length;

            // Ensure all cards in the list have quantity 1
            cardList.forEach((card) => {
                expect(card.quantity).toBe(1);
            });
        });

        // Check that the total number of entries matches the expected value
        expect(totalEntries).toBe(expectedTotalEntries);
    });
});
