import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  3,
//TODO Xanthyx Harvester cannot be used while it has a non-Mars neighbor.
Reap: Gain 1A.
	reap: {
		(state, config) => {
        //Add reap code here
}	},

}

cardScripts.scripts.set("xanthyx-harvester", cardScript)