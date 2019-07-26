import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // After you choose Sanctum as your active house, gain 2<A>.
    power: () => 3,
}
cardScripts.scripts.set("jehu-the-bureaucrat", cardScript)