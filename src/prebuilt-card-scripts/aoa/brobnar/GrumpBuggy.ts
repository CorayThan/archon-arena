import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Your opponent’s keys cost +1A for each friendly creature with power 5 or higher. Your keys cost +1A for each enemy creature with power 5 or higher.
    amber: () => 1,
}
cardScripts.scripts.set("grump-buggy", cardScript)