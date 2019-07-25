import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // After an enemy creature is destroyed fighting Francus, Francus captures 1<A>.
    power: () => 6,
    armor: () => 1,
}
cardScripts.scripts.set("francus", cardScript)