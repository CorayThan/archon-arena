import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { Creature } from "../../../shared/gamestate/Creature"
import { House } from "../../../shared/keyforge/house/House"
import { activePlayerState, discardTopCard, putInHand } from "../../ScriptUtils"
import { CardInGame } from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            let endSearching = false
            while (!endSearching && activePlayerState(state).library.length > 0) {
                let discardedCard = discardTopCard(state, activePlayerState(state))
                if (!discardedCard) return
                else discardedCard = discardedCard as CardInGame
                if ((discardedCard as Creature).power && discardedCard.backingCard.house === House.Brobnar) {
                    endSearching = true
                    putInHand(state, [discardedCard])
                }
            }
        }
    }
}

cardScripts.scripts.set("sound-the-horns", cardScript)
