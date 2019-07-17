import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  7,
//TODO Zorg enters play stunned. Before Fight: Stun the creature Zorg fights and each of that creature’s neighbors.
	fight: {
		perform: (state, config) => {
        //Add fight code here
}	},
	beforeFight: {
		perform: (state, config) => {
        //Add beforeFight code here
}	},

}

cardScripts.scripts.set("zorg", cardScript)