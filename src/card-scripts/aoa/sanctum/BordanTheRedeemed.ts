import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  3,
	elusive: () =>  true,
//TODO Elusive. (The first time this creature is attacked each turn, no damage is dealt.)
Action: Capture 2A.
	action: {
		(state, config) => {
        //Add action code here
}	},

}

cardScripts.scripts.set("bordan-the-redeemed", cardScript)