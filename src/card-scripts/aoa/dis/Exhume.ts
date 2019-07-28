import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, playCards } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Choose a creature in your discard pile. You may play that creature as if it belonged to the active house and was in your hand.
    amber: () => 1,
    onPlay: {
        validTargets: (state: GameState) => activePlayerState(state).discard
            .filter(x => x.backingCard.cardType === "Creature"),
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            playCards(state, config.targets)
        }
    }
}
cardScripts.scripts.set("exhume", cardScript)