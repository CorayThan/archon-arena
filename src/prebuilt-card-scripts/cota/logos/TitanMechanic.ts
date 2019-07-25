import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // While Titan Mechanic is on a flank, each key costs –1<A>.
    power: () => 6,
}
cardScripts.scripts.set("titan-mechanic", cardScript)