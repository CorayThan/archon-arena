import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // When Groggins is used to fight, it can only attack flank creatures.
    power: () => 8,
}
cardScripts.scripts.set("groggins", cardScript)