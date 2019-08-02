import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, discardCards, putInArchives } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Archive a card. Discard a card.
    amber: () => 1,
    onPlay: {
        validTargets: (state: GameState) => activePlayerState(state).hand,
        numberOfTargets: () => 1,
        perform: (state: GameState, config0: CardActionConfig) => {
            putInArchives(state, config0.targets, true)
            return {
                validTargets: (state: GameState) => activePlayerState(state).hand,
                numberOfTargets: () => 1,
                perform: (state: GameState, config1: CardActionConfig) => {
                    discardCards(state, config1.targets)
                }
            }
        }
    }
}
cardScripts.scripts.set("sloppy-labwork", cardScript)