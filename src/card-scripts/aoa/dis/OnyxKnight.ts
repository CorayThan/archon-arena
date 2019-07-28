import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, destroyCards, totalPower } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Destroy each creature with odd power.
    power: () => 4,
    onPlay: {
        perform: (state: GameState) => {
            const targets = allCreatures(state)
                .filter(x => !(totalPower(x) % 2 === 0))
            destroyCards(state, targets)
        }
    }
}
cardScripts.scripts.set("onyx-knight", cardScript)