import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { enemyPlayer, friendlyPlayer, inactivePlayerState, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Skirmish. Play: Your opponent gains 1A. Destroyed: Steal 3A.
    power: () => 3,
    skirmish: () => true,
    onPlay: {
        perform: (state: GameState) => {
            modifyAmber(inactivePlayerState(state), 1)
        }
    },
    destroyed: {
        perform: (state: GameState, config: CardActionConfig) => {
            let number = 3
            if (number > enemyPlayer(state, config.thisCard).amber) number = enemyPlayer(state, config.thisCard).amber
            modifyAmber(enemyPlayer(state, config.thisCard), -number)
            modifyAmber(friendlyPlayer(state, config.thisCard), number)
        }
    }
}
cardScripts.scripts.set("brend-the-fanatic", cardScript)