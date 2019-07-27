import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, modifyAmber, purgeCards, revealCards } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Reveal your hand. Purge each revealed non-Mars creature and gain 1<A> for each card purged this way.
    onPlay: {
        perform: (state: GameState) => {
            const hand = activePlayerState(state).hand
            revealCards(state, hand)
            const toPurge = hand
                .filter(x => (x as Creature).backingCard.house !== House.Mars &&
                    (x as Creature).backingCard.cardType === "Creature")
            purgeCards(state, toPurge)
            modifyAmber(activePlayerState(state), toPurge.length)
        }
    }
}

cardScripts.scripts.set("martians-make-bad-allies", cardScript)