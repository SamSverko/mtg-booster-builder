import LZString from "lz-string";

import { App, ManaBox } from "@/types";

/**
 * Serialize the generated boosters into a compressed URL-friendly string.
 */
export const serializeBoosters = (boosters: ManaBox.Card[][]): string => {
    const serializedBoosters: App.PlayBoosterSerialized[] = boosters.map(
        (booster) => ({
            s: booster[0].setCode,
            c: booster.map((card) => ({
                b: card.binderType,
                c: card.collectorNumber,
                f: card.foil,
                n: card.name,
                r: card.rarity,
            })),
        })
    );

    const json = JSON.stringify(serializedBoosters);

    const compressed = LZString.compressToEncodedURIComponent(json);

    return compressed;
};
