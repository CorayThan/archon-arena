import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // After an enemy creature is destroyed fighting Mugwump, fully heal Mugwump and give it a +1 power counter.
    power: () => 6,
}
cardScripts.scripts.set("mugwump", cardScript)