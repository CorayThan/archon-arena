import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  2,
	elusive: () =>  true,
//TODO Elusive. (The first time this creature is attacked each turn, no damage is dealt.)Reap: Put an enemy creature into your archives. If that creature leaves your archives, it is put into its owner’s hand instead.
	reap: {
		perform: (state, config) => {
        //Add reap code here
}	},

}

cardScripts.scripts.set("uxlyx-the-zookeeper", cardScript)