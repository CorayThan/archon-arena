import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // At the end of your turn, your opponent loses 1<A>.
    power: () => 2,
}
cardScripts.scripts.set("shaffles", cardScript)