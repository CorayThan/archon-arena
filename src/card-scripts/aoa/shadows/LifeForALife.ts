import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { dealDamage, destroyCards, friendlyCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Sacrifice a creature to deal 6D to a creature.
    amber: () => 1,
    onPlay: {
        validTargets: friendlyCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config0: CardActionConfig) => {
            return {
                validTargets: friendlyCreatures,
                numberOfTargets: () => 1,
                perform: (state: GameState, config1: CardActionConfig) => {
                    destroyCards(state, config0.targets)
                    dealDamage(config1.targets as Creature[], 6)
                }
            }
        }
    }
}
cardScripts.scripts.set("life-for-a-life", cardScript)