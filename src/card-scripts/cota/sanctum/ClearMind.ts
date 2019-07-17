import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO Play: Unstun each friendly creature.
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("clear-mind", cardScript)