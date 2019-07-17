import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO Action: Choose a creature. For the remainder of the turn, that creature is considered a flank creature and gains, “Reap: Draw a card.”
	reap: {
		perform: (state, config) => {
        //Add reap code here
}	},
	action: {
		perform: (state, config) => {
        //Add action code here
}	},

}

cardScripts.scripts.set("spectral-tunneler", cardScript)