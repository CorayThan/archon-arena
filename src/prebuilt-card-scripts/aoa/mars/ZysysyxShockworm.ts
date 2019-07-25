import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // After an enemy creature reaps, stun it.
    power: () => 3,
    armor: () => 1,
}
cardScripts.scripts.set("zysysyx-shockworm", cardScript)