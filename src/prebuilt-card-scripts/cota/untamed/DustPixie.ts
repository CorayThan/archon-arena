import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // (Vanilla)
    amber: () => 2,
    power: () => 1,
}
cardScripts.scripts.set("dust-pixie", cardScript)