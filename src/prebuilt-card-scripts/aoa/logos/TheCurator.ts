import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Friendly artifacts enter play ready.
    power: () => 3,
}
cardScripts.scripts.set("the-curator", cardScript)