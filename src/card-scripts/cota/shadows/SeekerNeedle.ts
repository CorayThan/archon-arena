import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
//TODO Action: Deal 1<D> to a creature. If this damage destroys that creature, gain 1<A>.
	action: {
		perform: (state, config) => {
        //Add action code here
}	},

}

cardScripts.scripts.set("seeker-needle", cardScript)