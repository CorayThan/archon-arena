import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  2,
	elusive: () =>  true,
//TODO Elusive. (The first time this creature is attacked each turn, no damage is dealt.)
Reap: Choose a friendly non-Mars creature and an enemy non-Mars creature. Stun the chosen creatures.
	reap: {
		(state, config) => {
        //Add reap code here
}	},

}

cardScripts.scripts.set("agent-hoo-man", cardScript)