import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  1,
	elusive: () =>  true,
//TODO Elusive. (The first time this creature is attacked each turn, no damage is dealt.)
Fight/Reap: You may play or use a Brobnar card this turn.
	reap: {
		(state, config) => {
        //Add reap code here
}	},
	{
		(state, config) => {
        //Add fight code here
}	},

}

cardScripts.scripts.set("brobnar-ambassador", cardScript)