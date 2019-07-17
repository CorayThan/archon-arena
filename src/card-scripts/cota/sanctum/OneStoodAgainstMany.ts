import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO Play: Ready and fight with a friendly creature 3 times, each time against a different enemy creature. Resolve these fights one at a time.
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("one-stood-against-many", cardScript)