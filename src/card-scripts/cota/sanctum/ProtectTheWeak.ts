import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // This creature gets +1 armor and gains taunt. (This creature’s neighbors cannot be attacked unless they have taunt.)
    amber: () => 1,
    staticEffect: (state, config) => {
        (config.targets[0] as Creature).tokens.armor += 1;
        (config.targets[0] as Creature).taunt = true
    }

}

cardScripts.scripts.set("protect-the-weak", cardScript)