import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  2,
	elusive: () =>  true,
//TODO Elusive. (The first time this creature is attacked each turn, no damage is dealt.)
Reap: If your opponent has more A than you, steal 1A.
	reap: {
		(state, config) => {
        //Add reap code here
}	},

}

cardScripts.scripts.set("gamgee", cardScript)