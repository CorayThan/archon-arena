import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { dealDamage, enemyCreatures } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Deal 1D to each enemy creature.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            dealDamage(enemyCreatures(state), 1)
        }
    }
}
cardScripts.scripts.set("whistling-darts", cardScript)