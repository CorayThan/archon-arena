import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Each enemy creature with armor loses all of its armor until the end of the turn and is dealt 1<D> for each point of armor it lost this way.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            allCreatures(state).forEach(x => {
                x.tokens.damage = x.tokens.armor
                x.tokens.armor = 0
            })
        }
    }
}
cardScripts.scripts.set("red-hot-armor", cardScript)