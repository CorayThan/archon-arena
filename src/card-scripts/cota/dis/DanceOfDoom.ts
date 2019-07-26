import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, destroyCards, totalPower } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Choose a number. Destroy each creature with power equal to that number.
    onPlay: {
        selectFromChoices: () => Array.from(Array(15).keys()),
        perform: (state: GameState, config: CardActionConfig) => {
            const targets = allCreatures(state)
                .filter(x => totalPower(x) === config.selection)
            destroyCards(state, targets)
        }
    }
}
cardScripts.scripts.set("dance-of-doom", cardScript)