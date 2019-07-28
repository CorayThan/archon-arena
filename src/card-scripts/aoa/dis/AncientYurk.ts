import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, discardCards } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Choose and discard 3 cards from your hand.
    power: () => 6,
    onPlay: {
        validTargets: (state: GameState) => activePlayerState(state).hand,
        numberOfTargets: (state: GameState) => Math.min(3, activePlayerState(state).hand.length),
        upToTargets: () => false,
        perform: (state: GameState, config: CardActionConfig) => {
            discardCards(state, config.targets)
        }
    }
}
cardScripts.scripts.set("ancient-yurk", cardScript)