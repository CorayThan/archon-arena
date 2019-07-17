import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  2,
//TODO Destroyed: Gain 2<A>.
	destroyed: {
		perform: (state, config) => {
        //Add destroyed code here
}	},

}

cardScripts.scripts.set("dust-imp", cardScript)