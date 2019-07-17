import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  9,
//TODO Tantadlin only deals 2D when fighting.
Fight: Discard a random card from your opponent’s archives.
	fight: {
		(state, config) => {
        //Add fight code here
}	},

}

cardScripts.scripts.set("tantadlin", cardScript)