import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Knoxx gets +3 power for each neighbor it has.
    power: () => 3,
}
cardScripts.scripts.set("knoxx", cardScript)