import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO Omni: Sacrifice Combat Pheromones. You may use up to 2 other Mars cards this turn.
	omni: {
		perform: (state, config) => {
        //Add omni code here
}	},

}

cardScripts.scripts.set("combat-pheromones", cardScript)