import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Ether Spider deals no damage when fighting.Each <A> that would be added to your opponent’s pool is captured by Ether Spider instead.
    power: () => 7,
}
cardScripts.scripts.set("ether-spider", cardScript)