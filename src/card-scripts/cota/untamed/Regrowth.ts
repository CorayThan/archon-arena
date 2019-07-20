import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {activePlayerState, putInHand} from "../../ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: (state) => activePlayerState(state).filter(card => card.backingCard.cardType === "Creature"),
        numberOfTargets: () => 1,
        perform: (state, config) => {
            putInHand(state, config.targets)
        }
    }
}

cardScripts.scripts.set("regrowth", cardScript)