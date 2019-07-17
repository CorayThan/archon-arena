import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  2,
//TODO Reap: Trigger the reap effect of another creature in play as if you controlled that creature. (That creature does not exhaust.)
	reap: {
		perform: (state, config) => {
        //Add reap code here
}	},

}

cardScripts.scripts.set("replicator", cardScript)