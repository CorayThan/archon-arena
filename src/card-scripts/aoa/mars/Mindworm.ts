import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { totalPower, dealDamage, enemyCreatures, friendlyCreatures, getNeighbors } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.)
    // Before Fight: The creature Mindworm fights deals damage equal to its power to each of its neighbors.
    power: () => 1,
    elusive: () => true,
    beforeFight: {
        //TODO target the attacked creature
        validTargets: enemyCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            const neighbors = getNeighbors(friendlyCreatures(state), config.thisCard as Creature)
            const power = neighbors.reduce((a, b) => a + totalPower(b), 0)
            dealDamage(config.targets as Creature[], power)
        }
    }
}

cardScripts.scripts.set("mindworm", cardScript)