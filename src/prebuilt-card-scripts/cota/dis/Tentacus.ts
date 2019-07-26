import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Your opponent must pay you 1<A> in order to use an artifact.
    power: () => 5,
}
cardScripts.scripts.set("tentacus", cardScript)