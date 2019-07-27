import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // This creature gets +1 armor and gains taunt. (This creature’s neighbors cannot be attacked unless they have taunt.)
    amber: () => 1,
    staticEffect: (state: GameState, config: CardActionConfig) => {
        (config.targets[0] as Creature).tokens.armor += 1;
        (config.targets[0] as Creature).taunt = true
    }

}

cardScripts.scripts.set("protect-the-weak", cardScript)