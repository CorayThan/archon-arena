import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // After Ogopogo attacks and destroys a creature, you may deal 2D to a creature.
    power: () => 6,
}
cardScripts.scripts.set("ogopogo", cardScript)