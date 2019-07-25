import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Each friendly Knight creature gets +1 power and gains taunt.
    amber: () => 1,
}
cardScripts.scripts.set("round-table", cardScript)