import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO Play: Deal 1<D> to each creature. Deal an additional 3<D> to each creature if your opponent forged a key on their previous turn.
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("tendrils-of-pain", cardScript)