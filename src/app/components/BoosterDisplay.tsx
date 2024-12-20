import { ManaBoxCardSerialized } from "@/app/types";
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Chip,
    List,
    ListItem,
    Typography,
} from "@mui/material";

type BoosterDisplayProps = {
    cards: ManaBoxCardSerialized[];
    index: number;
};

// TODO - add sorting and checking them off?
export default function BoosterDisplay({ cards, index }: BoosterDisplayProps) {
    return (
        <Card
            sx={{
                width: "100%",
            }}
        >
            <CardHeader
                title={`Booster ${index}`}
                subheader={cards[0].setCode}
                sx={{
                    pb: 1,
                }}
            />
            <CardContent
                sx={{
                    pt: 1,
                }}
            >
                <List dense disablePadding>
                    {cards.map((card, index) => (
                        <ListItem key={index}>
                            <Box alignItems="center" display="flex" gap={1}>
                                <Chip
                                    label={card.collectorNumber}
                                    size="small"
                                    sx={{
                                        justifyContent: "flex-end",
                                        width: "6ch",
                                    }}
                                />
                                <Typography>{card.name}</Typography>
                            </Box>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}
