import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Hazardous 5. (Before this creature is attacked, deal 5<D> to the attacking enemy.)
    power: () => 2,
    hazardous: () => 0,
}
cardScripts.scripts.set("briar-grubbling", cardScript)