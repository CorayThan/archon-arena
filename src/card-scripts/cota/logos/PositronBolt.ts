import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allFlankCreatures, dealDamage, getNeighbors } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Deal 3<D> to a flank creature. Deal 2<D> to its neighbor. Deal 1<D> to the second creature’s other neighbor.
    amber: () => 1,
    onPlay: {
        validTargets: allFlankCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config0: CardActionConfig) => {
            return {
                validTargets: (state: GameState) => getNeighbors(state, config0.targets[0] as Creature),
                numberOfTargets: () => 1,
                perform: (state: GameState, config1: CardActionConfig) => {
                    return {
                        validTargets: (state: GameState) => getNeighbors(state, config1.targets[0] as Creature)
                            .filter(x => x.id !== (config0.targets[0] as Creature).id),
                        numberOfTargets: () => 1,
                        perform: (state: GameState, config2: CardActionConfig) => {
                            dealDamage(config0.targets as Creature[], 3)
                            dealDamage(config1.targets as Creature[], 2)
                            dealDamage(config2.targets as Creature[], 1)
                        }
                    }
                }
            }

        }
    }
}
cardScripts.scripts.set("positron-bolt", cardScript)