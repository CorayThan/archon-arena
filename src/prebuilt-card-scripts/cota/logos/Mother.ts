import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // During your “draw cards” step, refill your hand to 1 additional card.
    power: () => 5,
}
cardScripts.scripts.set("mother", cardScript)