import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO Skip your “forge a key” step.You get all <A> spent by your opponent when forging keys.Action: Sacrifice The Sting.
	action: {
		perform: (state, config) => {
        //Add action code here
}	},

}

cardScripts.scripts.set("the-sting", cardScript)