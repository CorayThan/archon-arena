import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, destroyCards, getLeastPowerful, getMostPowerful } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Destroy each creature with the lowest power and each creature with the highest power.
    onPlay: {
        perform: (state: GameState) => {
            const targets = getMostPowerful(allCreatures(state)).concat(getLeastPowerful(allCreatures(state)))
            destroyCards(state, targets)
        }
    }
}
cardScripts.scripts.set("standardized-testing", cardScript)