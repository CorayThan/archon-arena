import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO Play: Deal 3<D> to a flank creature. Deal 2<D> to its neighbor. Deal 1<D> to the second creature’s other neighbor.
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("positron-bolt", cardScript)