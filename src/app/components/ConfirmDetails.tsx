import { SetCodeWithCardCount } from "@/app/types";

import styles from "@/app/components/ConfirmDetails.module.scss";

type ConfirmDetailsProps = {
    boosterAllocation: SetCodeWithCardCount[];
    cardCountPerSet: number;
    boosterCount: number;
};

export default function ConfirmDetails({
    boosterAllocation,
    cardCountPerSet,
    boosterCount,
}: ConfirmDetailsProps) {
    return (
        <div>
            <ul className={styles.list}>
                <li>
                    <b># cards required:</b> <span>{cardCountPerSet}</span>
                </li>
                <li>
                    <b># boosters to be generated:</b>{" "}
                    <span>{boosterCount}</span>
                </li>
                <li>
                    <b># boosters per set:</b>
                    <ul>
                        {boosterAllocation.length === 0 ? (
                            <li>None allocated</li>
                        ) : (
                            boosterAllocation.map((setCodeWithCardCount) => (
                                <li key={setCodeWithCardCount.setCode}>
                                    {setCodeWithCardCount.setCode}:{" "}
                                    {setCodeWithCardCount.allocatedBoosterCount}
                                </li>
                            ))
                        )}
                    </ul>
                </li>
            </ul>
        </div>
    );
}
