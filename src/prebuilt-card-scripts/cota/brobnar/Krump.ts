import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // After an enemy creature is destroyed fighting Krump, its controller loses 1<A>.
    power: () => 6,
}
cardScripts.scripts.set("krump", cardScript)