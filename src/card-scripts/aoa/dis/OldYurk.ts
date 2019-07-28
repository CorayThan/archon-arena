import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, discardCards } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Choose and discard 2 cards from your hand.
    power: () => 5,
    onPlay: {
        validTargets: (state: GameState) => activePlayerState(state).hand,
        numberOfTargets: () => 2,
        perform: (state: GameState, config: CardActionConfig) => {
            discardCards(state, config.targets)
        }
    }
}
cardScripts.scripts.set("old-yurk", cardScript)