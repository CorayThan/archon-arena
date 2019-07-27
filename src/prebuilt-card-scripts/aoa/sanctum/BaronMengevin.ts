import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // After you discard a Sanctum card from your hand, Baron Mengevin captures 1A.
    power: () => 6,
    armor: () => 1,
}
cardScripts.scripts.set("baron-mengevin", cardScript)