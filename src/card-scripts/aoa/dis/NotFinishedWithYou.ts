import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, putInDeck } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Shuffle any number of creatures from your discard pile into your deck.
    amber: () => 1,
    onPlay: {
        validTargets: (state: GameState) => activePlayerState(state).discard
            .filter(x => x.backingCard.cardType === "Creature"),
        numberOfTargets: (state: GameState) => activePlayerState(state).discard
            .filter(x => x.backingCard.cardType === "Creature").length,
        upToTargets: () => true,
        perform: (state: GameState, config: CardActionConfig) => {
            putInDeck(state, config.targets)
        }
    }
}
cardScripts.scripts.set("not-finished-with-you", cardScript)