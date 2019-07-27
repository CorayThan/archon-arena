import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // For each damage on Angwish, your opponent’s keys cost +1A.
    power: () => 6,
}
cardScripts.scripts.set("angwish", cardScript)