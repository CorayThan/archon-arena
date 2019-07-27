import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.) Creatures must fight when used, if able.
    power: () => 2,
    elusive: () => true,
}
cardScripts.scripts.set("little-rapscal", cardScript)