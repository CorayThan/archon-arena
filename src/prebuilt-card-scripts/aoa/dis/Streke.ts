import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.) While Streke is not on a flank, your opponent refills their hand to 1 less card during their “draw cards” step.
    power: () => 2,
    elusive: () => true,
}
cardScripts.scripts.set("streke", cardScript)