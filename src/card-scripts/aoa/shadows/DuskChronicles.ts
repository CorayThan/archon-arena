import { CardActionConfig, CardScript } from "../../types/CardScript"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, drawCards, inactivePlayerState, putInArchives } from "../../ScriptUtils"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Play: If your opponent has more A than you, draw a card. If you have more A than your opponent, archive a card.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            if (activePlayerState(state).amber > inactivePlayerState(state).amber) {
                return {
                    validTargets: (state: GameState) => activePlayerState(state).hand,
                    numberOfTargets: () => 1,
                    perform: (state: GameState, config: CardActionConfig) => {
                        putInArchives(state, config.targets, true)
                    }
                }
            }
            if (activePlayerState(state).amber < inactivePlayerState(state).amber) {
                drawCards(activePlayerState(state), 1)
            }
        }
    }
}
cardScripts.scripts.set("dusk-chronicles", cardScript)