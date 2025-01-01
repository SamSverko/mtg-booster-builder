import { PLAY_BOOSTER_RULE } from "./generic"; // Can't import from from the `@/constants` alias here because it's a circular dependency
import { PLAY_BOOSTER_RULE_BLB } from "./blb";
import { App } from "@/types";

type PlayBoosterRules = {
    [key: string]: App.PlayBoosterRule;
};

export const PLAY_BOOSTER_RULES: PlayBoosterRules = {
    generic: PLAY_BOOSTER_RULE,
    blb: PLAY_BOOSTER_RULE_BLB,
};
