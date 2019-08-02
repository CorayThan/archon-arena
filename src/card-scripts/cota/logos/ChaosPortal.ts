import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { House } from "../../../shared/keyforge/house/House"
import { activePlayerState, checkHouse, playCards, revealCards } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Action: Choose a house. Reveal the top card of your deck. If it is of that house, play it.
    action: {
        selectFromChoices: () => Object.values(House),
        perform: (state: GameState, config: CardActionConfig) => {
            if (0 >= activePlayerState(state).library.length) return
            const card = activePlayerState(state).library[0]
            revealCards(state, [card])
            if (checkHouse(card, config.selection as House)) {
                playCards(state, [card])
            }
        }
    }
}
cardScripts.scripts.set("chaos-portal", cardScript)