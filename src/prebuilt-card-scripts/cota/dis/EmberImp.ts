import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Your opponent cannot play more than 2 cards each turn.
    power: () => 2,
}
cardScripts.scripts.set("ember-imp", cardScript)