import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Lollop the Titanic deals no damage when attacked.
    power: () => 11,
}
cardScripts.scripts.set("lollop-the-titanic", cardScript)