import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.)Each time a creature is destroyed, its opponent gains 1<A>.
    power: () => 1,
    elusive: () => true,
}
cardScripts.scripts.set("tolas", cardScript)