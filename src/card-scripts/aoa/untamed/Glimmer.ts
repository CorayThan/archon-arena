import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {activePlayerState, putInHand} from "../../ScriptUtils"
import {CardInGame} from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
    // Alpha. (You can only play this card before doing anything else this step.)
    // Play: Return a card from your discard pile to your hand.
    power: () => 1,
    alpha: () => true,
    onPlay: {
        validTargets: (state) => activePlayerState(state).discard,
        numberOfTargets: () => 1,
        perform: (state, config) => {
            config.targets.forEach(target => putInHand(target as CardInGame))
        }
    },

}

cardScripts.scripts.set("glimmer", cardScript)