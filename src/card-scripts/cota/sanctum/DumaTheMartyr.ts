import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { activePlayerState, drawCards, friendlyCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Destroyed: Fully heal each other friendly creature and draw 2 cards.
    power: () => 3,
    destroyed: {
        perform: (state) => {
            friendlyCreatures(state).forEach(creature => (creature as Creature).tokens.damage = 0)
            drawCards(activePlayerState(state), 2)
        }
    }
}

cardScripts.scripts.set("duma-the-martyr", cardScript)