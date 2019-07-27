import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Each friendly creature gets +1 power.
}
cardScripts.scripts.set("banner-of-battle", cardScript)