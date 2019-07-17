import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  4,
//TODO Fight/Reap: Purge a creature from a discard pile. If you do, put a +1 power counter on Eater of the Dead.
	reap: {
		perform: (state, config) => {
        //Add reap code here
}	},
	fight: {
		perform: (state, config) => {
        //Add fight code here
}	},

}

cardScripts.scripts.set("eater-of-the-dead", cardScript)