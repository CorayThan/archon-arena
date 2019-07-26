import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.)Deal 1<D> to each enemy creature after it enters play.
    power: () => 2,
    elusive: () => true,
}
cardScripts.scripts.set("pingle-who-annoys", cardScript)