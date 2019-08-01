import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Taunt. (This creature’s neighbors cannot be attacked unless they have taunt.)
    // While Pitlord is in play you must choose Dis as your active house.
    amber: () => 2,
    power: () => 9,
    taunt: () => true,
    staticEffect: () => {
        //TODO friendlyPlayer(state, config.thisCard).houseChoice === House.Dis
    }
}
cardScripts.scripts.set("pitlord", cardScript)