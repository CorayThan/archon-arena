import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enemyPlayer, stunCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // After an enemy creature reaps, stun it.
    power: () => 2,
    onAnyReap: {
        perform: (state: GameState, config: CardActionConfig) => {
            if (enemyPlayer(state, config.thisCard).creatures.some(x => x.id === config.triggerCard.id)) {
                stunCreatures([config.triggerCard] as Creature[])
            }
        }
    }
}
cardScripts.scripts.set("pip-pip", cardScript)