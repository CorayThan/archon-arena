import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // After an enemy creature reaps, stun it.
    power: () => 2,
}
cardScripts.scripts.set("pip-pip", cardScript)