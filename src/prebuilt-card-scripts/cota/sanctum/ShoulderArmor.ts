import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // While this creature is on a flank, it gets +2 armor and +2 power.
    amber: () => 1,
}
cardScripts.scripts.set("shoulder-armor", cardScript)