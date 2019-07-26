import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // After your opponent gains A by reaping, Sir Marrows captures it.
    power: () => 4,
    armor: () => 2,
}
cardScripts.scripts.set("sir-marrows", cardScript)