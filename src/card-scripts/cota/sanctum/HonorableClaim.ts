import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { captureAmber, friendlyCreatures, getCardsWithTrait } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Each friendly Knight creature captures 1<A>.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            const knights = getCardsWithTrait(friendlyCreatures(state), "Knight")
            knights.forEach(knight => captureAmber(state, knight as Creature, 1))
        }
    }
}

cardScripts.scripts.set("honorable-claim", cardScript)