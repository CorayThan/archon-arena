import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, destroyCards } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Omega. (After you play this card, end this step.) Play: Destroy each creature.
    omega: () => true,
    onPlay: {
        perform: (state: GameState) => {
            destroyCards(state, allCreatures(state))
        }
    }
}
cardScripts.scripts.set("unlocked-gateway", cardScript)