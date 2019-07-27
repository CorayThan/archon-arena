import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Staunch Knight gets +2 power while it is on a flank.
    power: () => 4,
    armor: () => 2,
}
cardScripts.scripts.set("staunch-knight", cardScript)