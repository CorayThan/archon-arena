import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // This creature gets +5 power.
    amber: () => 1,
}
cardScripts.scripts.set("blood-of-titans", cardScript)