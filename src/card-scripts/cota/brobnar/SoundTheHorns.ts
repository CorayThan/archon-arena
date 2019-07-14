import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { House } from "../../../shared/keyforge/house/House"
import { discardTopCard, activePlayerState, returnToHand } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        perform: (state) => {
            var endSearching = false
            while(!endSearching && activePlayerState(state).library.length > 0) {
                var discardedCard = discardTopCard(state, true)
                if ((discardedCard as Creature).power && discardedCard.backingCard.house === House.Brobnar) {
                    endSearching = true
                    returnToHand(discardedCard)
                }
            }
    }
    }
}

cardScripts.scripts.set("sound-the-horns", cardScript)