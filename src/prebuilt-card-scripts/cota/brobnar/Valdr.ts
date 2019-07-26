import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Valdr deals +2<D> while attacking an enemy creature on the flank.
    power: () => 6,
}
cardScripts.scripts.set("valdr", cardScript)