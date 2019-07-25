import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Skirmish. (When you use this creature to fight, it is dealt no damage in return.)Poison. (Any damage dealt by this creature’s power during a fight destroys the damaged creature.)
    power: () => 3,
    skirmish: () => true,
    poison: () => true,
}
cardScripts.scripts.set("macis-asp", cardScript)