import LZString from "lz-string";

import { App } from "@/types";
import { condenseBooster } from "@/utils";

/**
 * Serialize the boosters into a compressed URL-friendly string.
 */
export const serializeBoosters = (boosters: App.PlayBooster[]): string => {
    const condensedBoosters = boosters.map((booster) =>
        condenseBooster(booster)
    );

    const json = JSON.stringify(condensedBoosters);

    const compressed = LZString.compressToEncodedURIComponent(json);

    return compressed;
};
