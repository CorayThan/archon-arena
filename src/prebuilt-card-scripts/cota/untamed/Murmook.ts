import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Your opponent’s keys cost +1<A>.
    power: () => 3,
}
cardScripts.scripts.set("murmook", cardScript)