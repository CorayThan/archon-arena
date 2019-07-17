import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO This creature gains, “Destroyed: You may put this creature into its owner's archives.” 
	destroyed: {
		perform: (state, config) => {
        //Add destroyed code here
}	},

}

cardScripts.scripts.set("biomatrix-backup", cardScript)