import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, playCards } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: You may play one non-Logos card this turn.
    onPlay: {
        validTargets: (state) => activePlayerState(state).hand,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            playCards(state, config.targets)
        }
    }
}
cardScripts.scripts.set("phase-shift", cardScript)