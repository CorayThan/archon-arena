import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
//TODO Play: If your opponent has more <A> than you, steal 1<A>. Repeat this card's effect if your opponent still has more <A> than you.
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("bait-and-switch", cardScript)