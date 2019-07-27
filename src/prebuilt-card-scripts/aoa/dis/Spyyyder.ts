import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Skirmish. (When you use this creature to fight, it is dealt no damage in return.) Spyyyder gains poison while attacking an enemy flank creature.
    power: () => 2,
    skirmish: () => true,
}
cardScripts.scripts.set("spyyyder", cardScript)