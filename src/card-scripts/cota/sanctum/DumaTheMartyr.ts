import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { drawCards, friendlyCreatures, friendlyPlayer } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Destroyed: Fully heal each other friendly creature and draw 2 cards.
    power: () => 3,
    destroyed: {
        perform: (state: GameState, config: CardActionConfig) => {
            friendlyCreatures(state).forEach(creature => (creature as Creature).tokens.damage = 0)
            drawCards(friendlyPlayer(state, config.thisCard), 2)
        }
    }
}

cardScripts.scripts.set("duma-the-martyr", cardScript)