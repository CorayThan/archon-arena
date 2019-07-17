import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {enemyCards, steal} from "../../ScriptUtils"

import {House} from "../../../shared/keyforge/house/House";

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        perform: (state) => {
            if (enemyCards(state).filter(card => card.backingCard.house === House.Logos).length >= 3) {
                steal(state, 2)
            }
        }
    }
}

cardScripts.scripts.set("take-that-smartypants", cardScript)