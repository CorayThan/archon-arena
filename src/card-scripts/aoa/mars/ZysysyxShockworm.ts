import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, enemyPlayer, stunCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // After an enemy creature reaps, stun it.
    power: () => 3,
    armor: () => 1,
    onAnyReap: {
        perform: (state: GameState, config: CardActionConfig) => {
            if (activePlayerState(state).player.id === enemyPlayer(state, config.thisCard).player.id) {
                stunCreatures([config.triggerCard] as Creature[])
            }
        }
    }
}

cardScripts.scripts.set("zysysyx-shockworm", cardScript)