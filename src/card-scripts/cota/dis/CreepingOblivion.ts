import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, inactivePlayerState, purgeCards } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Purge up to 2 cards from a discard pile.
    amber: () => 1,
    onPlay: {
        selectFromChoices: () => ["Enemy Discard", "My Discard"],
        perform: (state: GameState, config0: CardActionConfig) => {
            const playerState = config0.selection === "My Discard" ? activePlayerState(state) : inactivePlayerState(state)
            return {
                validTargets: () => playerState.discard,
                numberOfTargets: () => 2,
                upToTargets: () => true,
                perform: (state: GameState, config1: CardActionConfig) => {
                    purgeCards(state, config1.targets)
                }
            }
        }
    }
}
cardScripts.scripts.set("creeping-oblivion", cardScript)