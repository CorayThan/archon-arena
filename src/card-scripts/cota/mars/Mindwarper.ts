import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  2,
	elusive: () =>  true,
//TODO Elusive. (The first time this creature is attacked each turn, no damage is dealt.)Action: Choose an enemy creature. It captures 1<A> from its own side.
	action: {
		perform: (state, config) => {
        //Add action code here
}	},

}

cardScripts.scripts.set("mindwarper", cardScript)