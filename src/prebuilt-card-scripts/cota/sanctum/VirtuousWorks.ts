import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // (Vanilla)
    amber: () => 3,
}
cardScripts.scripts.set("virtuous-works", cardScript)