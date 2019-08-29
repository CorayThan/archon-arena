import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { drawCards, friendlyPlayer, getNeighbors } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.)
    // After a creature is played adjacent to Fila the Researcher, draw a card.
    power: () => 1,
    elusive: () => true,
    cardPlayed: {
        perform: (state: GameState, config: CardActionConfig) => {
            if (getNeighbors(state, config.thisCard as Creature).some(creature => creature.id === config.triggerCard.id)) {
                drawCards(friendlyPlayer(state, config.thisCard), 1)
            }
        }
    }
}
cardScripts.scripts.set("fila-the-researcher", cardScript)