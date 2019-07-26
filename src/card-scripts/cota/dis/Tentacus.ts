import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, enemyPlayer, friendlyPlayer, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Your opponent must pay you 1<A> in order to use an artifact.
    power: () => 5,
    onAnyAction: {
        perform: (state: GameState, config: CardActionConfig) => {
            if (activePlayerState(state).player.id === enemyPlayer(state, config.thisCard).player.id) {
                modifyAmber(friendlyPlayer(state, config.thisCard), 1)
                modifyAmber(enemyPlayer(state, config.thisCard), 1)
            }
        }
    }
}
cardScripts.scripts.set("tentacus", cardScript)