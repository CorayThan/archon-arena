import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  2,
//TODO Play: Steal 1A. If your opponent has 7A or more, steal 2A instead.
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("ronnie-wristclocks", cardScript)