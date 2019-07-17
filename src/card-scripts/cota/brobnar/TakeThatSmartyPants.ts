import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {enemyCards, steal} from "../../types/ScriptUtils"
import {House} from "../../../shared/keyforge/house/House";

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        perform: (state) => {
            if(enemyCards(state).filter(card => card.backingCard.house === House.Logos).length >= 3) {
                steal(state, 2)
            }
        }
    }
}

cardScripts.scripts.set("take-that-smarty-pants", cardScript)