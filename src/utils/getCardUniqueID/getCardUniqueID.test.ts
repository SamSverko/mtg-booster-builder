import { getCardUniqueID } from "@/utils";
import { generateMockCards } from "@/utils/test-utils";

describe("getCardUniqueID", () => {
    it("should generate correct uniqueID for a normal card", () => {
        const card = generateMockCards({
            cardProps: [{ foil: "normal" }],
        })[0];

        const uniqueID = getCardUniqueID(card);

        expect(uniqueID).toBe(`${card.scryfallID}_normal`);
    });

    it("should generate correct uniqueID for a foil card", () => {
        const card = generateMockCards({
            cardProps: [{ foil: "foil" }],
        })[0];

        const uniqueID = getCardUniqueID(card);

        expect(uniqueID).toBe(`${card.scryfallID}_foil`);
    });

    it("should generate correct uniqueID for different scryfallID and foil statuses", () => {
        const cards = generateMockCards({
            cardProps: [{ foil: "normal" }, { foil: "foil" }],
        });

        const uniqueID1 = getCardUniqueID(cards[0]);
        const uniqueID2 = getCardUniqueID(cards[1]);

        expect(uniqueID1).toBe(`${cards[0].scryfallID}_normal`);
        expect(uniqueID2).toBe(`${cards[1].scryfallID}_foil`);
    });

    it("should generate correct uniqueID for multiple cards with same scryfallID but different foil statuses", () => {
        const cards = generateMockCards({
            cardProps: [{ foil: "normal" }, { foil: "foil" }],
        });

        const uniqueID1 = getCardUniqueID(cards[0]);
        const uniqueID2 = getCardUniqueID(cards[1]);

        expect(uniqueID1).toBe(`${cards[0].scryfallID}_normal`);
        expect(uniqueID2).toBe(`${cards[1].scryfallID}_foil`);
    });

    it("should handle generated cards with mock data correctly", () => {
        const cards = generateMockCards({
            cardProps: [{ foil: "normal" }, { foil: "foil" }],
        });

        const uniqueID1 = getCardUniqueID(cards[0]);
        const uniqueID2 = getCardUniqueID(cards[1]);

        expect(uniqueID1).toBe(`${cards[0].scryfallID}_normal`);
        expect(uniqueID2).toBe(`${cards[1].scryfallID}_foil`);
    });

    it("should generate correct uniqueIDs for a batch of cards", () => {
        const cards = generateMockCards({
            cardProps: [
                { foil: "normal" },
                { foil: "foil" },
                { foil: "normal" },
            ],
        });

        const uniqueID1 = getCardUniqueID(cards[0]);
        const uniqueID2 = getCardUniqueID(cards[1]);
        const uniqueID3 = getCardUniqueID(cards[2]);

        expect(uniqueID1).toBe(`${cards[0].scryfallID}_normal`);
        expect(uniqueID2).toBe(`${cards[1].scryfallID}_foil`);
        expect(uniqueID3).toBe(`${cards[2].scryfallID}_normal`);
    });
});
