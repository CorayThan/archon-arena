import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, destroyCards } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Destroy each creature with any <A> on it.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            const targets = allCreatures(state)
                .filter(x => x.tokens.amber > 0)
            destroyCards(state, targets)
        }
    }
}
cardScripts.scripts.set("guilty-hearts", cardScript)