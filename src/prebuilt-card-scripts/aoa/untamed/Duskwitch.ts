import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Omega. (After you play this card, end this step.) Elusive. (The first time this creature is attacked each turn, no damage is dealt.) Your creatures enter play ready.
    power: () => 1,
    elusive: () => true,
    omega: () => true,
}
cardScripts.scripts.set("duskwitch", cardScript)