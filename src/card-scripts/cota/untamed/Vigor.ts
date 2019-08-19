import { CardActionConfig, CardScript } from "../../types/CardScript"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, allCreatures, healCreatures, modifyAmber } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Play: Heal up to 3 damage from a creature. If you healed 3 damage, gain 1<A>.
    amber: () => 1,
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config0: CardActionConfig) => {
            return {
                selectFromChoices: () => Array.from(Array(Math.min(3, (config0.targets[0] as Creature).tokens.damage))),
                perform: (state: GameState, config1: CardActionConfig) => {
                    healCreatures(config0.targets as Creature[], +config1.selection!)
                    if (config1.selection! >= 3) {
                        modifyAmber(activePlayerState(state), 1)
                    }
                }
            }
        }
    }
}
cardScripts.scripts.set("vigor", cardScript)
