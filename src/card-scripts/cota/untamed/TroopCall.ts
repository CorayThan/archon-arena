import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, friendlyCreatures, getCardsWithTrait, putInHand } from "../../ScriptUtils"
import { CardInGame } from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
    // Play: Return each friendly Niffle creature from your discard pile and from play to your hand.
    amber: () => 1,
    onPlay: {
        validTargets: (state: GameState) => getCardsWithTrait(activePlayerState(state).discard
            .concat(friendlyCreatures(state) as CardInGame[]), "Niffle"),
        upToTargets: () => true,
        perform: (state: GameState, config: CardActionConfig) => {
            putInHand(state, config.targets)
        }
    }
}

cardScripts.scripts.set("troop-call", cardScript)