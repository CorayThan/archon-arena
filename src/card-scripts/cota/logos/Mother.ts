import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState } from "../../ScriptUtils"

const cardScript: CardScript = {
    // During your “draw cards” step, refill your hand to 1 additional card.
    power: () => 5,
    staticEffect: (state: GameState) => {
        activePlayerState(state).handSize += 1
    }
}
cardScripts.scripts.set("mother", cardScript)