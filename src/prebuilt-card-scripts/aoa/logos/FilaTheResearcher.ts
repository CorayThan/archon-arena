import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.) After a creature is played adjacent to Fila the Researcher, draw a card.
    power: () => 1,
    elusive: () => true,
}
cardScripts.scripts.set("fila-the-researcher", cardScript)