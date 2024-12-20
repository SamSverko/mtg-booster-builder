import { ManaBoxCardSerialized } from "@/app/types";
import { deserializeBoosters } from "@/app/utils";

interface BoostersPageProps {
    searchParams: Promise<{ [key: string]: string }>;
}

interface BoosterDisplayProps {
    cards: ManaBoxCardSerialized[];
    index: number;
}

const BoosterDisplay = ({ cards, index }: BoosterDisplayProps) => {
    return (
        <div
            style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
            }}
        >
            <h2>
                Booster {index} [{cards[0].setCode}]
            </h2>
            {cards.map((card, index) => (
                <div key={index} style={{ marginBottom: "8px" }}>
                    #{card.collectorNumber} <strong>{card.name}</strong>
                </div>
            ))}
        </div>
    );
};

export default async function BoostersPage({
    searchParams,
}: BoostersPageProps) {
    const query = await searchParams;

    const serializedBoosters = query.serializedBoosters;

    const boosters = deserializeBoosters(serializedBoosters);

    return (
        <div>
            <h1>Deserialized Boosters</h1>
            {boosters.length > 0 ? (
                boosters.map((cards, index) => (
                    <BoosterDisplay
                        cards={cards}
                        index={index + 1}
                        key={`booster-${cards[0].collectorNumber}-${index}`}
                    />
                ))
            ) : (
                <p>
                    No boosters found in the URL. Please provide a
                    serializedBoosters query param.
                </p>
            )}
        </div>
    );
}
