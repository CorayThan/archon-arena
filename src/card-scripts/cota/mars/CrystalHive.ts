import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, addEffect } from "../../ScriptUtils"

const cardId = "crystal-hive"
const cardScript: CardScript = {
    // Action: For the remainder of the turn, gain 1<A> each time a creature reaps.
    action: {
        perform: async (state: GameState, config: CardActionConfig) => {
            addEffect(state, state.turn, cardId)
        }
    },
    effect: {
        onReap: {
            perform: (state: GameState, config: CardActionConfig) => {
                activePlayerState(state).amber += 1
            }
        }
    }
}

cardScripts.scripts.set(cardId, cardScript)
