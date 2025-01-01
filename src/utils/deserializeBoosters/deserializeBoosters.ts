import LZString from "lz-string";

import { type BoosterCondensed } from "@/utils";

/**
 * Deserialize the serialized boosters from the URL query string.
 */
export const deserializeBoosters = (
    query?: string | null
): BoosterCondensed[] => {
    if (!query) return [];

    try {
        const decompressed = LZString.decompressFromEncodedURIComponent(query);

        const parsed: BoosterCondensed[] = JSON.parse(decompressed || "[]");

        return parsed;
    } catch (error) {
        console.error("Failed to parse boosters from URL:", error);
        return [];
    }
};
