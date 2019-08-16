import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { drawCards, friendlyPlayer } from "../../ScriptUtils"

const cardScript: CardScript = {
    // After a creature is destroyed fighting Brain Eater, draw a card.
    power: () => 6,
    onDestroyedEnemyInFight: {
        perform: (state: GameState, config: CardActionConfig) => {
            drawCards(friendlyPlayer(state, config.thisCard), 1)
        }
    }
}
cardScripts.scripts.set("brain-eater", cardScript)