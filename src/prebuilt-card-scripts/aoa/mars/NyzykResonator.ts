import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // For each neighbor Nyzyk Resonator has, your opponent’s keys cost +2A.
    power: () => 2,
    armor: () => 1,
}
cardScripts.scripts.set("nyzyk-resonator", cardScript)