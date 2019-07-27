import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // You cannot play creatures.  After an enemy creature is destroyed fighting Grommid, your opponent loses 1<A>.
    power: () => 10,
}
cardScripts.scripts.set("grommid", cardScript)