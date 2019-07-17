import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  4,
//TODO Fight/Reap: Return an artifact or flank creature to its owner’s hand.
	reap: {
		perform: (state, config) => {
        //Add reap code here
}	},
	fight: {
		perform: (state, config) => {
        //Add fight code here
}	},

}

cardScripts.scripts.set("snudge", cardScript)