import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  3,
	elusive: () =>  true,
//TODO Elusive. (The first time this creature is attacked each turn, no damage is dealt.)Reap: Return an Urchin from play or from your discard pile to your hand.
	reap: {
		perform: (state, config) => {
        //Add reap code here
}	},

}

cardScripts.scripts.set("faygin", cardScript)