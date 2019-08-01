import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { House } from "../../../shared/keyforge/house/House"
import { activePlayerState, discardTopCard, playCards } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Action: Choose a house. Reveal the top card of your deck. If it is of that house, play it.
    action: {
        selectFromChoices: () => Object.values(House),
        perform: (state: GameState, config: CardActionConfig) => {
            const target = discardTopCard(state, activePlayerState(state))
            if (config.selection === target.backingCard.house) {
                playCards(state, [target])
            }
        }
    }
}
cardScripts.scripts.set("chaos-portal", cardScript)