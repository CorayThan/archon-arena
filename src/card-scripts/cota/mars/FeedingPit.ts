import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, discardCards, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Action: Discard a creature from your hand. If you do, gain 1<A>.
    action: {
        validTargets: (state: GameState) => activePlayerState(state).hand.filter(x => x.backingCard.cardType === "Creature"),
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            if (config.targets.length > 0) {
                discardCards(state, config.targets)
                modifyAmber(activePlayerState(state), 1)
            }
        }
    }
}

cardScripts.scripts.set("feeding-pit", cardScript)