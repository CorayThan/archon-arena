import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {GameState, PlayerState} from "../../../shared/gamestate/GameState"
import {activePlayerState, inactivePlayerState} from "../../ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            const ownState = activePlayerState(state) as PlayerState
            ownState.amber = Math.min(ownState.amber, 5)

            const opponentState = inactivePlayerState(state) as PlayerState
            opponentState.amber = Math.min(opponentState.amber, 5)
        }
    }
}

cardScripts.scripts.set("doorstep-to-heaven", cardScript)
