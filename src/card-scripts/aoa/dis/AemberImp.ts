import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, enemyPlayer, stunCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.) After a creature reaps, stun it.
    power: () => 2,
    elusive: () => true,
    onAnyReap: {
        perform: (state: GameState, config: CardActionConfig) => {
            if (activePlayerState(state).player.id === enemyPlayer(state, config.thisCard).player.id) {
                stunCreatures([config.triggerCard] as Creature[])
            }
        }
    }
}
cardScripts.scripts.set("æmber-imp", cardScript)
