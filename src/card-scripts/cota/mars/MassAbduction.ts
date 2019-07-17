import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO Play: Put up to 3 damaged enemy creatures into your archives. If any of these creatures leave your archives, they are put into their owner’s hand instead.
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("mass-abduction", cardScript)