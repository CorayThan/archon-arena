import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {activePlayerState, inactivePlayerState, purgeCards} from "../../ScriptUtils"
import {CardInGame} from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
    // Action: Purge a creature from a discard pile.
    amber: () => 1,
    action: {
        validTargets: (state) => activePlayerState(state).discard.concat(inactivePlayerState(state).discard),
        numberOfTargets: () => 1,
        perform: (state, config) => {
            purgeCards(state, config.targets as CardInGame[])
        }
    }
}

cardScripts.scripts.set("eye-of-judgment", cardScript)