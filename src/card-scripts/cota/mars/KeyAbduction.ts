import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO Play: Return each Mars creature to its owner's hand. Then, you may forge a key at +9<A> current cost, reduced by 1<A> for each card in your hand.
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("key-abduction", cardScript)