import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { activePlayerState, putInHand } from "../../ScriptUtils"
import { CardInGame } from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: (state) => activePlayerState(state).discard
            .filter(x => (x as CardInGame).backingCard.traits.includes("Niffle")),
        perform: (state, config) => {
            putInHand(state, config.targets)
        }
    }
}

cardScripts.scripts.set("troop-call", cardScript)