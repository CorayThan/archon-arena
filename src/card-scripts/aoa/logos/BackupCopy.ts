import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO This creature gains, “Destroyed: Put this creature on top of your deck.”
	destroyed: {
		perform: (state, config) => {
        //Add destroyed code here
}	},

}

cardScripts.scripts.set("backup-copy", cardScript)