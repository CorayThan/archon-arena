import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import {
    activePlayerState,
    discardTopCard,
    inactivePlayerState,
    modifyAmber,
    otherPlayerState,
    revealCards
} from "../../ScriptUtils"
import { CardInGame } from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
    // Play: Discard the top card of your opponent’s deck and reveal their hand.
    // You gain 1<A> for each card of the discarded card’s house revealed this way. Your opponent repeats the preceding effect on you.
    onPlay: {
        perform: (state: GameState) => {
            [inactivePlayerState(state), activePlayerState(state)].forEach(playerState => {
                const discardedCard = discardTopCard(state, playerState)
                revealCards(state, playerState.hand)
                if (discardedCard) {
                    const house = (discardedCard as CardInGame).backingCard.house
                    const count = playerState.hand
                        .filter(x => x.backingCard.house === house)
                        .length
                    modifyAmber(otherPlayerState(state, playerState), count)
                }
            })
        }
    }
}
cardScripts.scripts.set("a-fair-game", cardScript)