import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, putInHand, shuffleDeck } from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 4,
    reap: {
        validTargets: (state: GameState) => {
            return activePlayerState(state)
                .library
                .concat(activePlayerState(state).discard)
                .filter(card => card.backingCard.cardTitle === "War Grumpus")
        },
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            putInHand(state, config.targets!)
            shuffleDeck(activePlayerState(state))
        }
    }
}

cardScripts.scripts.set("grumpus-tamer", cardScript)
