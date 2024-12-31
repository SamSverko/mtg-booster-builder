import {
    deserializeBoosters,
    serializeBoosters,
    type BoosterCondensed,
} from "@/utils";
import { generateMockBoosters } from "@/utils/test-utils";

describe("deserializeBoosters", () => {
    it("should deserialize a valid query string", () => {
        const mockBoosters = generateMockBoosters({
            boosterProps: [
                { setCode: "SET001" },
                { setCode: "SET002" },
                { setCode: "SET003" },
            ],
        });
        const serialized = serializeBoosters(mockBoosters);
        const deserialized = deserializeBoosters(serialized);

        expect(deserialized).toHaveLength(3);
        expect(deserialized[0].s).toBe("SET001");
        expect(deserialized[1].s).toBe("SET002");
        expect(deserialized[2].s).toBe("SET003");
    });

    it("should handle an empty list of boosters", () => {
        const serialized = serializeBoosters([]);
        const deserialized = deserializeBoosters(serialized);

        expect(deserialized).toEqual<BoosterCondensed[]>([]);
    });

    it("should return an empty array for an empty query", () => {
        expect(deserializeBoosters(null)).toEqual<BoosterCondensed[]>([]);
        expect(deserializeBoosters(undefined)).toEqual<BoosterCondensed[]>([]);
        expect(deserializeBoosters("")).toEqual<BoosterCondensed[]>([]);
    });

    it("should return an empty array for an invalid query string", () => {
        const result = deserializeBoosters("invalid-compressed-data");

        expect(result).toEqual<BoosterCondensed[]>([]);
    });
});
