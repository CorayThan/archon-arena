import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  5,
//TODO Play/Fight/Reap: Deal 1<D> to each non-Horseman creature. 
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},
	reap: {
		perform: (state, config) => {
        //Add reap code here
}	},
	fight: {
		perform: (state, config) => {
        //Add fight code here
}	},

}

cardScripts.scripts.set("horseman-of-pestilence", cardScript)