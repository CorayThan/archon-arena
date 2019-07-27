import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.) Each other Martian creature gets +1 armor.
    power: () => 2,
    armor: () => 2,
    elusive: () => true,
}
cardScripts.scripts.set("ixxyxli-fixfinger", cardScript)