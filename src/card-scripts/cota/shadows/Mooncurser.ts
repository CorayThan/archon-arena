import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  1,
	skirmish: () =>  true,
	poison: () =>  true,
//TODO Skirmish. Poison.Fight: Steal 1<A>.
	fight: {
		perform: (state, config) => {
        //Add fight code here
}	},

}

cardScripts.scripts.set("mooncurser", cardScript)