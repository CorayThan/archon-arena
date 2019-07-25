import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Taunt. (This creature’s neighbors cannot be attacked unless they have taunt.)Yxilx Dominator enters play stunned.
    power: () => 9,
    armor: () => 1,
    taunt: () => true,
}
cardScripts.scripts.set("yxilx-dominator", cardScript)