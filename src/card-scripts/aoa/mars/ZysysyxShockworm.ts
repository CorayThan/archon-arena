import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { stunCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // After an enemy creature reaps, stun it.
    power: () => 3,
    armor: () => 1,
    onEnemyReap: {
        perform: (state: GameState, config: CardActionConfig) => {
            stunCreatures([config.triggerCard] as Creature[])
        }
    }
}

cardScripts.scripts.set("zysysyx-shockworm", cardScript)