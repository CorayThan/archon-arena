import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Deal 1<D> to each creature after it enters play.
    amber: () => 1,
}
cardScripts.scripts.set("autocannon", cardScript)