import { ManaBoxCardSerialized } from "@/app/types";
import { deserializeBoosters } from "@/app/utils";

interface BoostersPageProps {
    searchParams: { [key: string]: string };
}

interface BoosterDisplayProps {
    booster: ManaBoxCardSerialized[];
}

const BoosterDisplay = ({ booster }: BoosterDisplayProps) => {
    return (
        <div
            style={{
                border: "1px solid #ccc",
                padding: "10px",
                borderRadius: "8px",
            }}
        >
            {booster.map((card, index) => (
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
    const { serializedBoosters } = searchParams;

    // Parse the boosters from the URL query param
    const boosters = serializedBoosters
        ? deserializeBoosters(serializedBoosters)
        : [];

    return (
        <div>
            <h1>Deserialized Boosters</h1>
            {boosters.length > 0 ? (
                boosters.map((booster, index) => (
                    <div key={index} style={{ marginBottom: "20px" }}>
                        <h2>
                            Booster {index + 1} {booster[index].setCode}
                        </h2>
                        <BoosterDisplay booster={booster} />
                    </div>
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
