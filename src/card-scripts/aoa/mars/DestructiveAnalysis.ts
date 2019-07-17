import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO Play: Deal 2D to a creature. You may purge any number of cards from your archives to deal an additional 2D to the same creature for each card purged this way.
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("destructive-analysis", cardScript)