import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, captureAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Each undamaged creature captures 1<A> from its opponent.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            const targets = allCreatures(state)
                .filter(x => 0 === x.tokens.damage)
            targets.forEach(x => captureAmber(state, x, 1))
        }
    }
}
cardScripts.scripts.set("pandemonium", cardScript)