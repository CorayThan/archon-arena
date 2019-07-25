import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Each of Bulwark’s neighbors gets +2 armor.
    power: () => 4,
    armor: () => 2,
}
cardScripts.scripts.set("bulwark", cardScript)