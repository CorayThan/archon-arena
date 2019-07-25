import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Before a creature fights, discard the top card of its controller's deck. If the discarded card is of the active house, exhaust that creature with no effect.
    amber: () => 1,
}
cardScripts.scripts.set("evasion-sigil", cardScript)