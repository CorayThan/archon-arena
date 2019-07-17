import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO You may spend <A> on Safe Place when forging keys.Action: Move 1<A> from your pool to Safe Place.
	action: {
		perform: (state, config) => {
        //Add action code here
}	},

}

cardScripts.scripts.set("safe-place", cardScript)