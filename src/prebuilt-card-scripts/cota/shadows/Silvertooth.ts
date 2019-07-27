import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Silvertooth enters play ready.
    power: () => 2,
}
cardScripts.scripts.set("silvertooth", cardScript)