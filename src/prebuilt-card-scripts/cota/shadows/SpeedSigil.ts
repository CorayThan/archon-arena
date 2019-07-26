import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // The first creature played each turn enters play ready.
    amber: () => 1,
}
cardScripts.scripts.set("speed-sigil", cardScript)