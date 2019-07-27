import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Each time you play another creature, gain 1<A>.
    power: () => 2,
}
cardScripts.scripts.set("hunting-witch", cardScript)