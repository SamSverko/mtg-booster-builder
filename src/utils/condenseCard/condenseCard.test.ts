import { condenseCard, type CardCondensed } from "@/utils";
import { generateMockCard } from "@/utils/test-utils";
import { ManaBox, App } from "@/types";

describe("condenseCard", () => {
    it("should condense a card into the correct format", () => {
        const mockCard = generateMockCard({
            binderType: "binder",
            collectorNumber: 123,
            foil: "foil",
            quantity: 1,
            rarity: "common",
            setCode: "ABC",
        });

        const result = condenseCard(mockCard);

        expect(result).toEqual<CardCondensed>({
            b: "binder",
            c: 123,
            f: "foil",
            n: mockCard.name,
            r: "common",
        });
    });

    it("should handle minimal data without issues", () => {
        const minimalCard: ManaBox.Card = {
            binderName: "",
            binderType: "binder",
            name: "",
            setCode: "",
            setName: "",
            collectorNumber: 0,
            foil: "foil",
            rarity: "common",
            quantity: 0,
            manaBoxID: 0,
            scryfallID: "",
            purchasePrice: 0,
            misprint: false,
            altered: false,
            condition: "mint",
            language: "",
            purchasePriceCurrency: "",
        };

        const result = condenseCard(minimalCard);

        expect(result).toEqual<CardCondensed>({
            b: "binder",
            c: 0,
            f: "foil",
            n: "",
            r: "common",
        });
    });

    it("should correctly map fields from the card input", () => {
        const mockCard: ManaBox.Card = {
            binderName: "AnotherBinder",
            binderType: "deck",
            name: "SpecialCard",
            setCode: "SET999",
            setName: "SpecialSet",
            collectorNumber: 999,
            foil: "normal",
            rarity: "mythic",
            quantity: 5,
            manaBoxID: 42,
            scryfallID: "xyz987",
            purchasePrice: 15.0,
            misprint: true,
            altered: true,
            condition: "excellent",
            language: "Japanese",
            purchasePriceCurrency: "JPY",
        };

        const result = condenseCard(mockCard);

        expect(result).toEqual<CardCondensed>({
            b: "deck",
            c: 999,
            f: "normal",
            n: "SpecialCard",
            r: "mythic",
        });
    });
});
