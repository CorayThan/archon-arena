import { CardScript, TargetArea, TargetType } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { discardTopCard, activePlayerState} from "../../types/ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        perform: (state) => {
            var endSearching = false
            while(!endSearching && activePlayerState(state).library.length > 0) {
                var discardedCard = discardTopCard(state, true)
                //TODO, not sure how to check whether a card is a creature... Also, need to be able to check a card's house
                if (discardedCard instanceof Creature && discardedCard.house === House.Brobnar)
            }
        }
    }
}

cardScripts.scripts.set("sound-the-horns", cardScript)