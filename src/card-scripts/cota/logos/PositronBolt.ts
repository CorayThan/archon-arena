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
        perform: (state: GameState, config: CardActionConfig) => {
            const neighbor1 = getNeighbors(state, config.targets[0] as Creature)
            const neighbor2 = getNeighbors(state, neighbor1[0] as Creature).filter(x => x.id !== config.targets[0].id)
            dealDamage(config.targets as Creature[], 3)
            dealDamage(neighbor1 as Creature[], 2)
            dealDamage(neighbor2 as Creature[], 1)
        }
    }
}
cardScripts.scripts.set("positron-bolt", cardScript)