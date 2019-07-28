import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, putInHand } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Return each creature to its owner’s hand.
    onPlay: {
        perform: (state: GameState) => {
            putInHand(state, allCreatures(state))
        }
    }
}
cardScripts.scripts.set("hysteria", cardScript)