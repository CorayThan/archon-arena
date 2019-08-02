import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { House } from "../../../shared/keyforge/house/House"
import { activePlayerState, checkHouse, discardCards, modifyAmber, putInArchives, revealCards } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.)
    // Reap: Choose a house. Reveal the top card of your deck. If it is of that house, archive it and gain 1<A>. Otherwise, discard it.
    power: () => 2,
    elusive: () => true,
    reap: {
        selectFromChoices: () => Object.values(House),
        perform: (state: GameState, config: CardActionConfig) => {
            if (0 >= activePlayerState(state).library.length) return
            const card = activePlayerState(state).library[0]
            revealCards(state, [card])
            if (checkHouse(card, config.selection as House)) {
                putInArchives(state, [card], true)
                modifyAmber(activePlayerState(state), 1)
            } else discardCards(state, [card])
        }
    }
}
cardScripts.scripts.set("vespilon-theorist", cardScript)