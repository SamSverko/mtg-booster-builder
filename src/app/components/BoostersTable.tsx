import { ManaBoxCardSerialized } from "@/app/types";
import {
    Table,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

type BoostersTableProps = {
    boosters: ManaBoxCardSerialized[][];
};

// TODO - add sorting and checking them off?
export default function BoostersTable({ boosters }: BoostersTableProps) {
    const headers = ["Number", "Name", "Foil", "Rarity"];

    console.log("boosters", boosters);

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableCell key={index}>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
            </Table>
        </TableContainer>
    );
}
