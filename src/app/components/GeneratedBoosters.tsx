import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box,
    List,
    ListItem,
    Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

import { ManaBoxCard } from "@/app/types";

type GeneratedBoostersProps = {
    generatedBoosters: ManaBoxCard[][];
};

// TODO - Use a table view/allow for more sorting/grouping options? (e.g. sort by collectorNumber, group by set, etc.)
export default function GeneratedBoosters({
    generatedBoosters,
}: GeneratedBoostersProps) {
    return (
        <Box>
            {generatedBoosters.map((booster, index) => (
                <Accordion key={index}>
                    <AccordionSummary
                        aria-controls={`booster-${index}-content`}
                        expandIcon={<ExpandMore />}
                        id={`booster-${index}-panel`}
                    >
                        Booster {index + 1} ({booster[0].setCode})
                    </AccordionSummary>
                    <AccordionDetails>
                        <List dense disablePadding>
                            {booster.map((card) => (
                                <ListItem
                                    key={card.scryfallID}
                                    secondaryAction={
                                        <Typography>
                                            {card.collectorNumber}
                                        </Typography>
                                    }
                                >
                                    <Typography>
                                        {card.name}{" "}
                                        {card.foil === "foil" ? " (foil)" : ""}
                                    </Typography>
                                </ListItem>
                            ))}
                        </List>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
}
