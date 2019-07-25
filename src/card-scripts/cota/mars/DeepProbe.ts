import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { House } from "../../../shared/keyforge/house/House"
import { discardCard, inactivePlayerState, revealCards } from "../../ScriptUtils"
import { CardInGame } from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
    // Play: Choose a house. Reveal your opponent's hand. Discard each creature of that house revealed this way.
    amber: () => 1,
    onPlay: {
        selectFromChoices: Object.keys(House),
        perform: (state: GameState, config: CardActionConfig) => {
            revealCards(state, inactivePlayerState(state).hand)
            const targets = inactivePlayerState(state).hand
                .filter(x => (x as CardInGame).backingCard.house === config.selection)
            discardCard(state, targets)
        }
    }
}

cardScripts.scripts.set("deep-probe", cardScript)