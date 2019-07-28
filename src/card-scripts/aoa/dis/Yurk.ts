import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, discardCards } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Choose and discard a card from your hand.
    power: () => 4,
    onPlay: {
        validTargets: (state: GameState) => activePlayerState(state).hand,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            discardCards(state, config.targets)
        }
    }
}
cardScripts.scripts.set("yurk", cardScript)