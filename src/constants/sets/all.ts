import { type PlayBoosterRule } from "@/types";
import { PLAY_BOOSTER_RULE } from "./generic"; // Can't import from from the `@/constants` alias here because it's a circular dependency
import { PLAY_BOOSTER_RULE_BLB } from "./blb";
import { PLAY_BOOSTER_RULE_DSK } from "./dsk";

type PlayBoosterRules = {
    [key: string]: PlayBoosterRule;
};

export const PLAY_BOOSTER_RULES: PlayBoosterRules = {
    generic: PLAY_BOOSTER_RULE,
    BLB: PLAY_BOOSTER_RULE_BLB,
    DSK: PLAY_BOOSTER_RULE_DSK,
};
