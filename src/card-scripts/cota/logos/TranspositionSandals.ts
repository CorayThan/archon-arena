import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO This creature gains, “Action: Swap this creature with another friendly creature in the battleline. You may use that other creature this turn.”
	action: {
		perform: (state, config) => {
        //Add action code here
}	},

}

cardScripts.scripts.set("transposition-sandals", cardScript)