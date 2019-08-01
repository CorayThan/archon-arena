import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, playCards } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Play the top card of your deck.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            if (0 >= activePlayerState(state).library.length) return
            const card = activePlayerState(state).library[0]
            playCards(state, [card])
        }
    }
}
cardScripts.scripts.set("wild-wormhole", cardScript)