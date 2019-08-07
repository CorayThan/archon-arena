import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { dealDamage, getNeighbors, totalPower } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.)
    // Before Fight: The creature Mindworm fights deals damage equal to its power to each of its neighbors.
    power: () => 1,
    elusive: () => true,
    beforeFight: {
        perform: (state: GameState, config: CardActionConfig) => {
            const neighbors = getNeighbors(state, config.targets[0] as Creature)
            const power = totalPower(config.targets[0] as Creature)
            dealDamage(neighbors, power)
        }
    }
}

cardScripts.scripts.set("mindworm", cardScript)