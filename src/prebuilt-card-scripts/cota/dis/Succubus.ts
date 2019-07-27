import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // During their “draw cards” step, your opponent refills their hand to 1 less card.
    power: () => 3,
}
cardScripts.scripts.set("succubus", cardScript)