import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // After a player forges a key, they lose all of their remaining A.
    power: () => 4,
}
cardScripts.scripts.set("forgemaster-og", cardScript)