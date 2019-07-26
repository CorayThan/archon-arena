import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // After an enemy creature is destroyed fighting Overlord Greking, put that creature into play under your control.
    power: () => 7,
}
cardScripts.scripts.set("overlord-greking", cardScript)