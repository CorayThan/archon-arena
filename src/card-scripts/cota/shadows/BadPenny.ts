import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  1,
//TODO Destroyed: Return Bad Penny to your hand.
	destroyed: {
		perform: (state, config) => {
        //Add destroyed code here
}	},

}

cardScripts.scripts.set("bad-penny", cardScript)