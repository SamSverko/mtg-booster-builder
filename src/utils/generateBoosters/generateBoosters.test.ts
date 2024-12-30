import { generateBoosters } from "@/utils";
import { generateMockCards } from "../test-utils";

describe("getCardCount", () => {
    it("should run", () => {
        const allocatedBoosterCountBySetCode = {
            blb: 2,
        };

        const cards = generateMockCards({
            count: 100,
            cardProps: [
                {
                    quantity: 1,
                    setCode: "blb",
                },
                {
                    quantity: 2,
                    setCode: "blb",
                },
            ],
        });

        const boosters = generateBoosters({
            allocatedBoosterCountBySetCode,
            cards,
        });
        console.log(boosters);

        expect(1).toBe(1);
    });
});
