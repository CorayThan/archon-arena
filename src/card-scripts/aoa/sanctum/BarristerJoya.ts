import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enemyPlayer } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Enemy creatures cannot reap.
    power: () => 5,
    armor: () => 1,
    staticEffect: (state: GameState, config: CardActionConfig) => {
        enemyPlayer(state, config.thisCard).creatures.forEach(x => {
            //TODO make Creature.canReap a thing
            //  (x as Creature).canReap = false
        })
    }

}

cardScripts.scripts.set("barrister-joya", cardScript)