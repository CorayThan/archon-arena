import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allPlayerStates, checkHouse, discardCards, modifyAmber } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Play: Each player discards the top 5 cards of their deck. For each Shadows card discarded, its owner gains 1A.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            allPlayerStates(state).forEach(playerState => {
                const cards = playerState.library.slice(0, 5)
                const shadowCards = cards.filter(x => checkHouse(x, House.Shadows))
                discardCards(state, cards)
                modifyAmber(playerState, shadowCards.length)
            })
        }
    }
}
cardScripts.scripts.set("rigged-lottery", cardScript)