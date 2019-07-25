import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // After an enemy creature reaps, if it is the first time a creature has reaped this turn, stun it.
}
cardScripts.scripts.set("aember-conduction-unit", cardScript)