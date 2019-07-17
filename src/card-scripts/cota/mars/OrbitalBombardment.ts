import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO Play: Reveal any number of Mars cards from your hand. For each card revealed this way, deal 2<D> to a creature. (You may choose a different creature each time.)
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("orbital-bombardment", cardScript)