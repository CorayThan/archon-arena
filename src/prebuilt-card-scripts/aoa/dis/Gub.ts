import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // While Gub is not on a flank, it gets +5 power and gains taunt.
    power: () => 1,
}
cardScripts.scripts.set("gub", cardScript)