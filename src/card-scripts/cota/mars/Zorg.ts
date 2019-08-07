import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enemyCreatures, getNeighbors, stunCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Zorg enters play stunned.  Before Fight: Stun the creature Zorg fights and each of that creature’s neighbors.
    power: () => 7,
    onPlay: {
        perform: (state, config) => stunCreatures([config.thisCard] as Creature[])
    },
    beforeFight: {
        validTargets: enemyCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            const targets = getNeighbors(state, config.targets[0] as Creature).concat(config.targets as Creature[])
            stunCreatures(targets)
        }
    }
}

cardScripts.scripts.set("zorg", cardScript)