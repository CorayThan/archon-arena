import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
//TODO Action: Discard the top 2 cards of your deck. For each Logos card discarded this way, a friendly creature captures 2A.
	action: {
		perform: (state, config) => {
        //Add action code here
}	},

}

cardScripts.scripts.set("fetchdrones", cardScript)