import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, inactivePlayerState, purgeCards } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Purge up to 2 cards from a discard pile.
    amber: () => 1,
    onPlay: {
        validTargets: (state: GameState) => activePlayerState(state).discard.concat(inactivePlayerState(state).discard),
        numberOfTargets: () => 2,
        upToTargets: () => true,
        perform: (state: GameState, config: CardActionConfig) => {
            purgeCards(state, config.targets)
        }
    }
}
cardScripts.scripts.set("creeping-oblivion", cardScript)