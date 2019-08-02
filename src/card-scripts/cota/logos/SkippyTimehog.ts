import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Play: Your opponent cannot use any cards next turn. (Cards can still be played and discarded.)
    power: () => 1,
    onPlay: {
        perform: () => {
            //TODO inactivePlayerState(state).useCards = false
        }
    }
}
cardScripts.scripts.set("skippy-timehog", cardScript)