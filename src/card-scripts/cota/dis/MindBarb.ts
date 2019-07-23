import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState, PlayerState } from "../../../shared/gamestate/GameState"
import { inactivePlayerState } from "../../ScriptUtils"
import { removeCardFromHand } from "../../../game/StateUtils"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        perform: (state) => {
            const opponentState = inactivePlayerState(state) as PlayerState

            if (!opponentState.hand.length) {
                return
            }

            const randomCardNum = Math.floor(Math.random() * opponentState.hand.length)
            const randomCard = opponentState.hand[randomCardNum]
            removeCardFromHand(opponentState, opponentState.hand[randomCardNum].id)
            opponentState.discard.push(randomCard)
        }
    }
}

cardScripts.scripts.set("mind-barb", cardScript)
