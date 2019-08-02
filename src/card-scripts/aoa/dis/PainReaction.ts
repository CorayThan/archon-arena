import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { dealDamage, enemyCreatures, getNeighbors, totalPower } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Deal 2D to an enemy creature. If this damage destroys that creature, deal 2D to each of that creature’s neighbors.
    amber: () => 1,
    onPlay: {
        validTargets: enemyCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            const neighbors = getNeighbors(state, config.targets[0] as Creature)
            if ((config.targets[0] as Creature).tokens.damage + 2 >= totalPower(config.targets[0] as Creature)) {
                dealDamage(neighbors, 2)
            }
            dealDamage(config.targets as Creature[], 2)
        }
    }
}
cardScripts.scripts.set("pain-reaction", cardScript)