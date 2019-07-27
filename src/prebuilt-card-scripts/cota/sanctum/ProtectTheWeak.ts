import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // This creature gets +1 armor and gains taunt. (This creature’s neighbors cannot be attacked unless they have taunt.)
    amber: () => 1,
}
cardScripts.scripts.set("protect-the-weak", cardScript)