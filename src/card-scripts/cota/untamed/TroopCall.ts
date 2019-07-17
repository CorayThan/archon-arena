import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {CardInGame} from "../../../shared/gamestate/CardInGame"
import {activePlayerState, putInHand} from "../../ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: (state) => activePlayerState(state).filter(card => card.backingCard.traits.includes("Niffle")),
        perform: (state, config) => {
            config.targets.forEach(target => putInHand(target as CardInGame))
        }
    }
}

cardScripts.scripts.set("troop-call", cardScript)