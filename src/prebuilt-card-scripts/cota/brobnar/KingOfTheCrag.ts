import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Each enemy Brobnar creature gets –2 power.
    power: () => 7,
}
cardScripts.scripts.set("king-of-the-crag", cardScript)