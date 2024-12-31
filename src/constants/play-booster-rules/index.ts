import { App } from "@/types";

import { PLAY_BOOSTER_RULE_BLB } from "@/constants/play-booster-rules/blb";
import { PLAY_BOOSTER_RULE_GENERIC } from "@/constants/play-booster-rules/generic";

type PlayBoosterRules = {
    [key: string]: App.PlayBoosterRule; // Add index signature
};

export const PLAY_BOOSTER_RULES: PlayBoosterRules = {
    generic: PLAY_BOOSTER_RULE_GENERIC,
    blb: PLAY_BOOSTER_RULE_BLB,
};
