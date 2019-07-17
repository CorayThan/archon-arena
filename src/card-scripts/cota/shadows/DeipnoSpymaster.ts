import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  1,
	elusive: () =>  true,
//TODO Elusive. (The first time this creature is attacked each turn, no damage is dealt.)Omni: Choose a friendly creature. You may use that creature this turn.
	omni: {
		perform: (state, config) => {
        //Add omni code here
}	},

}

cardScripts.scripts.set("deipno-spymaster", cardScript)