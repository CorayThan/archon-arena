import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  2,
	elusive: () =>  true,
//TODO Elusive. (The first time this creature is attacked each turn, no damage is dealt.)
Reap: Move 1A from a friendly creature to your pool.
	reap: {
		(state, config) => {
        //Add reap code here
}	},

}

cardScripts.scripts.set("mother-northelle", cardScript)