import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  5,
	armor: () =>  1,
//TODO Play: If your opponent has 7 or more <A>, capture all but 5 of it.
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("gatekeeper", cardScript)