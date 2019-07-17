import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  2,
	skirmish: () =>  true,
//TODO Skirmish. (When you use this creature to fight, it is dealt no damage in return.)Fight: Steal 1<A>.
	fight: {
		perform: (state, config) => {
        //Add fight code here
}	},

}

cardScripts.scripts.set("umbra", cardScript)