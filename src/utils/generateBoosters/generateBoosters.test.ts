import { generateBoosters } from "@/utils";
import { generateMockCards } from "../test-utils";

describe("getCardCount", () => {
    it("should run", () => {
        const allocatedBoosterCountBySetCode = {
            blb: 2,
        };

        const cards = generateMockCards({
            cardProps: Array(100).fill({
                setCode: "blb",
            }),
        });

        const boosters = generateBoosters({
            allocatedBoosterCountBySetCode,
            cards,
        });
        // console.log(JSON.stringify(boosters, null, 2));

        expect(1).toBe(1);
    });
});
