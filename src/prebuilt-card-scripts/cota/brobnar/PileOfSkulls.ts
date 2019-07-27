import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Each time an enemy creature is destroyed during your turn, a friendly creature captures 1<A>.
}
cardScripts.scripts.set("pile-of-skulls", cardScript)