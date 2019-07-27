import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Deploy. (This creature can enter play anywhere in your battleline.) Taunt. (This creature’s neighbors cannot be attacked unless they have taunt.)
    power: () => 4,
    armor: () => 2,
    deploy: () => true,
    taunt: () => true,
}
cardScripts.scripts.set("challe-the-safeguard", cardScript)