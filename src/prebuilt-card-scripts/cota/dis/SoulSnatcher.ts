import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Each time a creature is destroyed, its owner gains 1<A>.
}
cardScripts.scripts.set("soul-snatcher", cardScript)