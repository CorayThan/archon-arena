import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { putOnTopOfDeck } from "../../ScriptUtils"

const cardScript: CardScript = {
    // This creature gains, “Destroyed: Put this creature on top of your deck.”
    amber: () => 1,
    destroyed: {
        perform: (state: GameState, config: CardActionConfig) => {
            putOnTopOfDeck(state, [config.thisCard])
        }
    }
}
cardScripts.scripts.set("backup-copy", cardScript)