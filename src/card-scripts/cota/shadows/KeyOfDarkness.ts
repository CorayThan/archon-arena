import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
//TODO Play: Forge a key at +6<A> current cost. If your opponent has no <A>, forge a key at +2<A> current cost instead.
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("key-of-darkness", cardScript)