import { SetCodeWithCardCount } from "@/app/types";
import styles from "@/app/components/SetSelectionListItem.module.scss";

type SetSelectionListItemProps = {
    isDisabled: boolean;
    isSelected: boolean;
    onToggle: () => void;
    set: SetCodeWithCardCount;
};

export default function SetSelectionListItem({
    isDisabled,
    isSelected,
    onToggle,
    set,
}: SetSelectionListItemProps) {
    return (
        <li className={styles.listItem}>
            <input
                checked={isSelected}
                disabled={isDisabled}
                id={set.setCode}
                name={set.setCode}
                onChange={onToggle}
                type="checkbox"
                value={set.setCode}
            />
            <label htmlFor={set.setCode}>
                {set.setCode} ({set.count} cards)
            </label>
        </li>
    );
}
