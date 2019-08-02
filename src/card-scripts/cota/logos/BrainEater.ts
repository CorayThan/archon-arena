import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, drawCards } from "../../ScriptUtils"

const cardScript: CardScript = {
    // After a creature is destroyed fighting Brain Eater, draw a card.
    power: () => 6,
    onDestroyedEnemyInFight: {
        perform: (state: GameState) => {
            drawCards(activePlayerState(state), 1)
        }
    }
}
cardScripts.scripts.set("brain-eater", cardScript)