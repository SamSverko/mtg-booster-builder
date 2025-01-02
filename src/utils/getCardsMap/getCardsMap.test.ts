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
            cardProps: [
                { quantity: 1, setCode: "set1", foil: "normal" },
                { quantity: 2, setCode: "set2", foil: "foil" },
                { quantity: 3, setCode: "set3", foil: "normal" },
            ],
        });

        const cardsMap = getCardsMap(cards);

        expect(cardsMap.size).toBe(cards.length);

        let totalEntries = 0;
        cardsMap.forEach((cardList, uniqueID) => {
            const [scryfallID, foilStatus] = uniqueID.split("_");

            // Ensure every uniqueID maps correctly to the card data
            const matchingCards = cards.filter(
                (card) =>
                    card.scryfallID === scryfallID && card.foil === foilStatus
            );

            // Check that the number of cards in the map matches the combined quantity
            const totalQuantity = matchingCards.reduce(
                (sum, card) => sum + card.quantity,
                0
            );
            expect(cardList.length).toBe(totalQuantity);

            // Ensure all cards in the list have quantity 1
            cardList.forEach((card) => {
                expect(card.quantity).toBe(1);
            });

            totalEntries += cardList.length;
        });

        const expectedTotalEntries = cards.reduce(
            (sum, card) => sum + card.quantity,
            0
        );
        expect(totalEntries).toBe(expectedTotalEntries);
    });

    it("should correctly split card quantities into individual entries", () => {
        const cards = generateMockCards({
            cardProps: [{ quantity: 5, setCode: "set1", foil: "foil" }],
        });

        const cardsMap = getCardsMap(cards);

        // Verify the map size
        expect(cardsMap.size).toBe(1); // One unique uniqueID

        cardsMap.forEach((cardList) => {
            // Check that the number of cards in the list matches the original quantity
            expect(cardList.length).toBe(5);

            // Verify each card has quantity 1
            cardList.forEach((card) => {
                expect(card.quantity).toBe(1);
            });
        });
    });

    it("should correctly handle duplicate scryfallIDs with different foil statuses", () => {
        const cards = generateMockCards({
            cardProps: [
                { quantity: 3, setCode: "set1", foil: "normal" },
                { quantity: 2, setCode: "set2", foil: "foil" },
            ],
        });

        // Ensure duplicate scryfallID with different foil status
        cards[1].scryfallID = cards[0].scryfallID;

        const cardsMap = getCardsMap(cards);

        // Verify the map size (two unique uniqueIDs: one for normal and one for foil)
        expect(cardsMap.size).toBe(2); // One for normal, one for foil

        cardsMap.forEach((cardList, uniqueID) => {
            const [scryfallID, foilStatus] = uniqueID.split("_");

            // Find the matching cards in the input
            const matchingCards = cards.filter(
                (card) =>
                    card.scryfallID === scryfallID && card.foil === foilStatus
            );

            // Calculate the total quantity for this scryfallID and foil status combination
            const totalQuantity = matchingCards.reduce(
                (sum, card) => sum + card.quantity,
                0
            );

            // Ensure the number of entries in the map matches the total quantity
            expect(cardList.length).toBe(totalQuantity);

            // Ensure each card has a quantity of 1 in the map
            cardList.forEach((card) => {
                expect(card.quantity).toBe(1);
            });
        });
    });

    it("should correctly process a large number of cards", () => {
        const cards = generateMockCards({
            count: 1000,
            cardProps: [
                { quantity: 10, setCode: "set1", foil: "normal" },
                { quantity: 20, setCode: "set2", foil: "foil" },
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
