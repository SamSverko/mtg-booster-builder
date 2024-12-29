import LZString from "lz-string";
import { deserializeBoosters, serializeBoosters } from "@/utils";
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

        expect(deserialized).toEqual([]);
    });

    it("should produce idempotent serialization and deserialization", () => {
        const mockBoosters = generateMockBoosters({
            count: 2,
            boosterProps: [
                { setCode: "SET123", cardProps: [{ foil: "foil" }] },
                { setCode: "SET456", cardProps: [{ foil: "normal" }] },
            ],
        });

        const serialized = serializeBoosters(mockBoosters);

        const deserialized = deserializeBoosters(serialized);

        const reserialized = LZString.compressToEncodedURIComponent(
            JSON.stringify(deserialized)
        );

        expect(serialized).toBe(reserialized);
    });
});
