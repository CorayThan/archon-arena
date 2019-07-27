import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.) At the start of your turn, archive the top card of your deck.
    power: () => 3,
    elusive: () => true,
}
cardScripts.scripts.set("director-of-z-y-x", cardScript)