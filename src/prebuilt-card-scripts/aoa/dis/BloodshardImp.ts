import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // After a creature reaps, its controller must sacrifice it.
    power: () => 2,
}
cardScripts.scripts.set("bloodshard-imp", cardScript)