import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  1,
	elusive: () =>  true,
//TODO Elusive. (The first time this creature is attacked each turn, no damage is dealt.)
Before Fight: The creature Mindworm fights deals damage equal to its power to each of its neighbors.
	fight: {
		(state, config) => {
        //Add fight code here
}	},
	{
		(state, config) => {
        //Add beforeFight code here
}	},

}

cardScripts.scripts.set("mindworm", cardScript)