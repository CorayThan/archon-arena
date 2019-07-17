import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {activePlayerState, putInHand} from "../../ScriptUtils"
import {CardInGame} from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: (state) => activePlayerState(state).filter(card => card.backingCard.cardType === "Creature"),
        numberOfTargets: () => 1,
        perform: (state, config) => {
            config.targets.forEach(target => putInHand(target as CardInGame))
        }
    }
}

cardScripts.scripts.set("regrowth", cardScript)