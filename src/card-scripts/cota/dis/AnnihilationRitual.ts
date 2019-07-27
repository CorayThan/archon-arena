import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { purgeCards } from "../../ScriptUtils"

const cardScript: CardScript = {
    // When a creature would enter a discard pile from play, it is purged instead.
    amber: () => 1,
    onDiscard: {
        perform: (state: GameState, config: CardActionConfig) => {
            purgeCards(state, [config.triggerCard])
        }
    }
}
cardScripts.scripts.set("annihilation-ritual", cardScript)