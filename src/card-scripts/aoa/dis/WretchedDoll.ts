import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, destroyCards, giveDoom } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Action: If there is a doom counter in play, destroy all creatures with doom counters. Otherwise, put a doom counter on a creature.
    action: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            const targets = allCreatures(state)
                .filter(x => x.tokens.doom > 0)
            if (targets.length > 0) destroyCards(state, targets)
            else giveDoom(config.targets as Creature[])
        }
    }
}
cardScripts.scripts.set("wretched-doll", cardScript)