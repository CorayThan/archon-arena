import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO Play: Each enemy creature with armor loses all of its armor until the end of the turn and is dealt 1<D> for each point of armor it lost this way.
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("red-hot-armor", cardScript)