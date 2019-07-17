import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
//TODO Action: If there is a doom counter in play, destroy all creatures with doom counters. Otherwise, put a doom counter on a creature.
	action: {
		perform: (state, config) => {
        //Add action code here
}	},

}

cardScripts.scripts.set("wretched-doll", cardScript)