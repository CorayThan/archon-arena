import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, destroyCards, totalPower } from "../../ScriptUtils"
import { CardInGame } from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
    // Play: Destroy each creature with power 3 or higher.
    onPlay: {
        perform: (state: GameState) => {
            const targets = allCreatures(state)
                .filter(x => totalPower(x) >= 3)
            destroyCards(state, targets as CardInGame[])
        }
    }
}

cardScripts.scripts.set("the-spirits-way", cardScript)