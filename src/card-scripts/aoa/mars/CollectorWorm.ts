import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  2,
	armor: () =>  5,
//TODO Fight: Archive the creature Collector Worm fights. If that creature leaves your archives, put it in its owner’s hand instead.
	fight: {
		perform: (state, config) => {
        //Add fight code here
}	},

}

cardScripts.scripts.set("collector-worm", cardScript)