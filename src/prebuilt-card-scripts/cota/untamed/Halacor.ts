import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Each friendly flank creature gains skirmish. (When you use a creature with skirmish to fight, it is dealt no damage in return.)
    power: () => 4,
}
cardScripts.scripts.set("halacor", cardScript)