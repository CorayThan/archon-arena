import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO This creature gains, “Reap: Choose a creature. Deal 1<D> to that creature for each Mars creature in play.”
	reap: {
		perform: (state, config) => {
        //Add reap code here
}	},

}

cardScripts.scripts.set("red-planet-ray-gun", cardScript)