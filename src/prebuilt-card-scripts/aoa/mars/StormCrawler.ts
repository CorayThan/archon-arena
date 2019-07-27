import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Storm Crawler only deals 1D when fighting. After an enemy creature reaps, stun it.
    power: () => 6,
    armor: () => 1,
}
cardScripts.scripts.set("storm-crawler", cardScript)