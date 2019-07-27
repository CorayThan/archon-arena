import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // This creature gets +2 power and gains hazardous 2. (Before this creature is attacked, deal 2<D> to the attacking enemy.)
    amber: () => 1,
}
cardScripts.scripts.set("flame-wreathed", cardScript)