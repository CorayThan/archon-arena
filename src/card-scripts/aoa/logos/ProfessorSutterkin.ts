import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  2,
//TODO Reap: Draw a card for each friendly Logos creature.
	reap: {
		perform: (state, config) => {
        //Add reap code here
}	},

}

cardScripts.scripts.set("professor-sutterkin", cardScript)