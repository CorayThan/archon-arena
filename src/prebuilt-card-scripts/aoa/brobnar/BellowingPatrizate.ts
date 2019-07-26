import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // While Bellowing Patrizate is ready, each creature takes 1D after it enters play.
    power: () => 7,
}
cardScripts.scripts.set("bellowing-patrizate", cardScript)