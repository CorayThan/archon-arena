import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Your <A> cannot be stolen.
    power: () => 4,
    armor: () => 1,
}
cardScripts.scripts.set("the-vaultkeeper", cardScript)