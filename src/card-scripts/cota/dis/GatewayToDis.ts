import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, allCreatures, destroyCards, gainChains } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Destroy each creature. Gain 3 chains.
    onPlay: {
        perform: (state: GameState) => {
            destroyCards(state, allCreatures(state))
            gainChains(activePlayerState(state), 3)
        }
    }
}
cardScripts.scripts.set("gateway-to-dis", cardScript)