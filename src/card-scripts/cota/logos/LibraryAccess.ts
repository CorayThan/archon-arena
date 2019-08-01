import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Play: For the remainder of the turn, each time you play another card, draw a card.
    onPlay: {
        perform: () => {
            //Add onPlay code here TODO
            //purgeCards(state, [config.thisCard])
        }
    }
}
cardScripts.scripts.set("library-access", cardScript)