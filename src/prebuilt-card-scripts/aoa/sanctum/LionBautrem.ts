import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Deploy. (This creature can enter play anywhere in your battleline.) “Lion” Bautrem’s neighbors get +2 power.
    power: () => 4,
    armor: () => 1,
    deploy: () => true,
}
cardScripts.scripts.set("lion-bautrem", cardScript)