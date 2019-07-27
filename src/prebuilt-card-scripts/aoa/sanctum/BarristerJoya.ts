import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Enemy creatures cannot reap.
    power: () => 5,
    armor: () => 1,
}
cardScripts.scripts.set("barrister-joya", cardScript)