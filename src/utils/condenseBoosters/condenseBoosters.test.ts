import { PLAY_BOOSTER_RULE } from "@/constants";
import { ManaBox } from "@/types";
import { condenseBoosters, type BoosterCondensed } from "@/utils";
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
                length: PLAY_BOOSTER_RULE.slots.length,
            }).map(() => cardProps),
        });

        const result = condenseBoosters([mockBooster]);

        expect(result).toEqual<BoosterCondensed[]>([
            {
                s: cardProps.setCode,
                c: Array.from({
                    length: PLAY_BOOSTER_RULE.slots.length,
                }).map(() => ({
                    b: "binder",
                    c: 123,
                    f: "foil",
                    n: "Mock Card Name",
                    r: "common",
                })),
            },
        ]);
    });

    it("should condense multiple boosters with various cards", () => {
        const cardPropsBooster1 = {
            binderType: "binder" as ManaBox.BinderType,
            collectorNumber: 101,
            foil: "normal" as ManaBox.CardFoil,
            quantity: 1,
            rarity: "rare" as ManaBox.CardRarity,
            setCode: "SET1",
        };

        const cardPropsBooster2 = {
            binderType: "binder" as ManaBox.BinderType,
            collectorNumber: 202,
            foil: "foil" as ManaBox.CardFoil,
            quantity: 1,
            rarity: "uncommon" as ManaBox.CardRarity,
            setCode: "SET2",
        };

        const mockBooster1 = generateMockBooster({
            cardProps: Array.from({
                length: PLAY_BOOSTER_RULE.slots.length,
            }).map(() => cardPropsBooster1),
            setCode: "SET1",
        });

        const mockBooster2 = generateMockBooster({
            cardProps: Array.from({
                length: PLAY_BOOSTER_RULE.slots.length,
            }).map(() => cardPropsBooster2),
            setCode: "SET2",
        });

        const result = condenseBoosters([mockBooster1, mockBooster2]);

        expect(result).toEqual<BoosterCondensed[]>([
            {
                s: "SET1",
                c: Array.from({
                    length: PLAY_BOOSTER_RULE.slots.length,
                }).map(() => ({
                    b: "binder",
                    c: 101,
                    f: "normal",
                    n: "Mock Card Name",
                    r: "rare",
                })),
            },
            {
                s: "SET2",
                c: Array.from({
                    length: PLAY_BOOSTER_RULE.slots.length,
                }).map(() => ({
                    b: "binder",
                    c: 202,
                    f: "foil",
                    n: "Mock Card Name",
                    r: "uncommon",
                })),
            },
        ]);
    });

    it("should handle a booster with no cards", () => {
        const mockBooster = { setCode: "", cards: [] };
        const result = condenseBoosters([mockBooster]);

        expect(result).toEqual<BoosterCondensed[]>([
            {
                s: "",
                c: [],
            },
        ]);
    });
});
