import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, dealDamage, getNeighbors } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Deal 3<D> to a creature and 3<D> to a neighbor of that creature.
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config0: CardActionConfig) => {
            return {
                validTargets: (state: GameState) => getNeighbors(state, config0.targets[0] as Creature),
                numberOfTargets: () => 1,
                perform: (state: GameState, config1: CardActionConfig) => {
                    dealDamage(config0.targets as Creature[], 3)
                    dealDamage(config1.targets as Creature[], 3)
                }
            }
        }
    }
}

cardScripts.scripts.set("mighty-lance", cardScript)