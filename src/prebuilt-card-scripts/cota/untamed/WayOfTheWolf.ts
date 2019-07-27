import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // This creature gains skirmish.  (When you use this creature to fight, it is dealt no damage in return.)
    amber: () => 1,
}
cardScripts.scripts.set("way-of-the-wolf", cardScript)