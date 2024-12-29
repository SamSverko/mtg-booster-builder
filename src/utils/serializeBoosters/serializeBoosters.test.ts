import { serializeBoosters } from "@/utils";
import { generateMockBoosters } from "@/utils/test-utils";

describe("serializeBoosters", () => {
    it("correctly serializes and compresses boosters", () => {
        const mockBoosters = generateMockBoosters();
        const result = serializeBoosters(mockBoosters);

        expect(typeof result).toBe("string");
        expect(result).toMatch(/^[a-zA-Z0-9\-_+]+$/); // Base64 URL-safe characters
    });

    it("handles empty boosters", () => {
        const mockBoosters = generateMockBoosters({ count: 0 });
        const result = serializeBoosters(mockBoosters);

        expect(typeof result).toBe("string");
        expect(result).toMatch(/^[a-zA-Z0-9\-_]+$/);
    });
});
