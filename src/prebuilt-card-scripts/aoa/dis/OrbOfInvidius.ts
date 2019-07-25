import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // After a creature reaps, stun it.
    amber: () => 1,
}
cardScripts.scripts.set("orb-of-invidius", cardScript)