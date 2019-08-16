import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, checkHouse, friendlyCreatures, playCards, putInHand } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Action: Return a ready friendly Mars creature to your hand.
    // If you do, put a Mars creature with a different name from your hand into play, then ready it.
    action: {
        validTargets: (state: GameState) => friendlyCreatures(state)
            .filter(x => x.ready && checkHouse(x, House.Mars)),
        numberOfTargets: () => 1,
        perform: (state: GameState, config0: CardActionConfig) => {
            if (0 >= config0.targets.length) return
            return {
                validTargets: (state: GameState) => activePlayerState(state).hand
                    .filter(x => checkHouse(x, House.Mars) && x.backingCard.cardTitle !== config0.targets[0].backingCard.cardTitle),
                numberOfTargets: () => 1,
                perform: (state: GameState, config1: CardActionConfig) => {
                    putInHand(state, config0.targets)
                    playCards(state, config1.targets)
                }
            }
        }
    }
}

cardScripts.scripts.set("swap-widget", cardScript)