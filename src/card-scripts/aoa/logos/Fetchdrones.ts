import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import {
    activePlayerState,
    captureAmber,
    checkHouse,
    discardTopCard,
    friendlyCreatures,
    inactivePlayerState
} from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Action: Discard the top 2 cards of your deck. For each Logos card discarded this way, a friendly creature captures 2A.
    //TODO need to select which creature would get 1 amber in the case of inactive having 3 amber
    action: {
        perform: (state: GameState) => {
            const cards = [discardTopCard(state, activePlayerState(state))]
            cards.concat(discardTopCard(state, activePlayerState(state)))
            const logosCards = cards.map(card => checkHouse(card, House.Logos))
            if (logosCards.length > 0) {
                return {
                    validTargets: friendlyCreatures,
                    numberOfTargets: (state: GameState) => Math.min(logosCards.length, inactivePlayerState(state).amber / 2),
                    perform: (state: GameState, config: CardActionConfig) => {
                        (config.targets as Creature[]).forEach(creature => captureAmber(state, creature, 2))
                    }
                }
            }
        }
    }
}
cardScripts.scripts.set("fetchdrones", cardScript)