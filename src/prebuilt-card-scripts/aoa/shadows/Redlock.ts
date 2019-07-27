import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Skirmish. (When you use this creature to fight, it is dealt no damage in return.) At the end of your turn, if you did not play any creatures this turn, gain 1A.
    power: () => 3,
    skirmish: () => true,
}
cardScripts.scripts.set("redlock", cardScript)