import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { Creature } from "../../../shared/gamestate/Creature"
import { dealDamage, enemyCreatures, getNeighbors } from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 5,
    beforeFight: {
        perform: (state: GameState, config: CardActionConfig) => {
            const neighbors = getNeighbors(enemyCreatures(state), config.targets![0] as Creature)
            dealDamage(neighbors, 2)
        }
    }
}

cardScripts.scripts.set("cowfyne", cardScript)
