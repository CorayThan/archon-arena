import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  7,
//TODO Reap: Return each copy of Ortannu’s Binding from your discard pile to your hand. For each one returned this way, deal 2D to a creature, with 2D splash.
	reap: {
		perform: (state, config) => {
        //Add reap code here
}	},

}

cardScripts.scripts.set("ortannu-the-chained", cardScript)