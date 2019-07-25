import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // After Maruck the Marked prevents damage with its armor, capture 1A for each damage just prevented.
    power: () => 5,
    armor: () => 1,
}
cardScripts.scripts.set("maruck-the-marked", cardScript)