import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // After you play another Mars creature, fully heal Tunk.
    power: () => 6,
    armor: () => 1,
}
cardScripts.scripts.set("tunk", cardScript)