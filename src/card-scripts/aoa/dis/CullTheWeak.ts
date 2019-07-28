import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, destroyCards, getLeastPowerful } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Destroy the least powerful enemy creature.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            const targets = getLeastPowerful(allCreatures(state))
            destroyCards(state, targets)
        }
    }
}
cardScripts.scripts.set("cull-the-weak", cardScript)