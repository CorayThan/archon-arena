import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
	power: () =>  2,
//TODO Play/Reap: Look at your opponent’s hand.
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},
	reap: {
		perform: (state, config) => {
        //Add reap code here
}	},

}

cardScripts.scripts.set("psychic-bug", cardScript)