import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
//TODO Play: Reveal your hand. Purge each revealed non-Mars creature and gain 1<A> for each card purged this way.
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("martians-make-bad-allies", cardScript)