import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  2,
	elusive: () =>  true,
//TODO Elusive. (The first time this creature is attacked each turn, no damage is dealt.)
Reap: Choose a house. Your opponent cannot choose that house as their active house on their next turn.
	reap: {
		(state, config) => {
        //Add reap code here
}	},

}

cardScripts.scripts.set("tezmal", cardScript)