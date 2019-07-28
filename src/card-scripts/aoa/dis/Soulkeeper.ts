import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, destroyCards, getMostPowerful } from "../../ScriptUtils"
import { CardInGame } from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
    // This creature gains, “Destroyed: Destroy the most powerful enemy creature.”
    amber: () => 1,
    destroyed: {
        perform: (state: GameState) => {
            const targets = getMostPowerful(allCreatures(state))
            destroyCards(state, targets as CardInGame[])
        }
    }
}
cardScripts.scripts.set("soulkeeper", cardScript)