import { MTG } from "@/constants";
import { App, ManaBox } from "@/types";
import { condenseBooster, condenseCard } from "@/utils";
import { generateMockBooster } from "@/utils/test-utils";

describe("condenseBooster", () => {
    it("should condense a booster with multiple cards", () => {
        const cardProps = {
            binderType: "binder" as ManaBox.BinderType,
            collectorNumber: 123,
            foil: "foil" as ManaBox.CardFoil,
            quantity: 1,
            rarity: "common" as ManaBox.CardRarity,
            setCode: "ABC",
        };

        const mockBooster = generateMockBooster({
            cardProps: Array.from({
                length: MTG.PLAY_BOOSTER_RULE.slots.length,
            }).map(() => cardProps),
        });

        const result = condenseBooster(mockBooster);

        expect(result).toEqual({
            s: cardProps.setCode,
            c: Array.from({ length: MTG.PLAY_BOOSTER_RULE.slots.length }).map(
                () => ({
                    b: "binder",
                    c: 123,
                    f: "foil",
                    n: "Mock Card Name",
                    r: "common",
                })
            ),
        });
    });

    it("should handle a booster with no cards", () => {
        const mockBooster = { setCode: "", cards: [] };
        const result = condenseBooster(mockBooster);

        expect(result).toEqual({
            s: "",
            c: [],
        });
    });
});
