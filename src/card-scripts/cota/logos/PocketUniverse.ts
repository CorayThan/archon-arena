import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
//TODO You may spend <A> on Pocket Universe when forging keys.Action: Move 1<A> from your pool to Pocket Universe.
	action: {
		perform: (state, config) => {
        //Add action code here
}	},

}

cardScripts.scripts.set("pocket-universe", cardScript)