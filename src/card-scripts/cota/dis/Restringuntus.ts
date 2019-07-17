import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  1,
//TODO Play: Choose a house. Your opponent cannot choose that house as their active house until Restringuntus leaves play.
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("restringuntus", cardScript)