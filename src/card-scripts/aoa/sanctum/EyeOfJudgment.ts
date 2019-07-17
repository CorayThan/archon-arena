import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO Action: Purge a creature from a discard pile.
	action: {
		perform: (state, config) => {
        //Add action code here
}	},

}

cardScripts.scripts.set("eye-of-judgment", cardScript)