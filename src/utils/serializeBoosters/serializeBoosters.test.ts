import {
    deserializeBoosters,
    serializeBoosters,
    type BoosterCondensed,
} from "@/utils";
import { generateMockBoosters } from "@/utils/test-utils";

describe("serializeBoosters", () => {
    it("should serialize boosters into a compressed string", () => {
        const mockBoosters = generateMockBoosters({
            count: 3,
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
});
