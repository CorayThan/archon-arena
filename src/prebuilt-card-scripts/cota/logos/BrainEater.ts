import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // After a creature is destroyed fighting Brain Eater, draw a card.
    power: () => 6,
}
cardScripts.scripts.set("brain-eater", cardScript)