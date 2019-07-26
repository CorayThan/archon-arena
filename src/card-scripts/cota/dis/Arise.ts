import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { House } from "../../../shared/keyforge/house/House"
import { activePlayerState, gainChains, putInHand } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play: Choose a house. Return each creature of that house from your discard pile to your hand. Gain 1 chain.
    onPlay: {
        selectFromChoices: () => Object.values(House),
        perform: (state: GameState, config: CardActionConfig) => {
            const targets = activePlayerState(state).discard
                .filter(x => x.backingCard.house === config.selection && x.backingCard.cardType === "Creature")
            putInHand(state, targets)
            gainChains(activePlayerState(state), 1)
        }
    }
}
cardScripts.scripts.set("arise", cardScript)