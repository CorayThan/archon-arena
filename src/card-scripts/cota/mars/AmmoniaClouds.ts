import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, dealDamage } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Deal 3<D> to each creature.
    onPlay: {
        perform: (state: GameState) => {
            dealDamage(allCreatures(state), 3)
        }
    }
}

cardScripts.scripts.set("ammonia-clouds", cardScript)