import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
//import {steal} from "../../ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    // onPlay: {
    //     perform: (state) => {
    //         TODO add cardUsedThisTurn
    //         if (cardUsedThisTurn(state) >= 3) steal(state, 2)
    //     }
    // }
}

cardScripts.scripts.set("stampede", cardScript)