import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // After an enemy creature is destroyed fighting Stealer of Souls, purge that creature and gain 1<A>.
    power: () => 6,
}
cardScripts.scripts.set("stealer-of-souls", cardScript)