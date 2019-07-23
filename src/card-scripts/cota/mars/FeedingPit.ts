import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { activePlayerState, discardCard, modifyAmber } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Action: Discard a creature from your hand. If you do, gain 1<A>.
    action: {
        validTargets: (state) => activePlayerState(state).hand.filter(x => x.backingCard.cardType === "Creature"),
        numberOfTargets: () => 1,
        perform: (state, config) => {
            if (config.targets.length > 0) {
                discardCard(state, config.targets)
                modifyAmber(activePlayerState(state), 1)
            }
        }
    }
}

cardScripts.scripts.set("feeding-pit", cardScript)