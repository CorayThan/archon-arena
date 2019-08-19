import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, discardCards, putInHand } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Look at the top 3 cards of your deck. Add 1 to your hand and discard the others.
    power: () => 2,
    onPlay: {
        validTargets: (state: GameState) => activePlayerState(state).library.slice(0, 3),
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            const discards = activePlayerState(state).library.slice(0, 3).filter(x => x.id !== config.targets[0].id)
            putInHand(state, config.targets)
            discardCards(state, discards)
        }
    }
}
cardScripts.scripts.set("eyegor", cardScript)