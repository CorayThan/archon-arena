import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
//TODO Action: Purge a creature in play. If you do, your opponent gains control of Spangler Box. If Spangler Box leaves play, return to play all cards purged by Spangler Box.
	action: {
		perform: (state, config) => {
        //Add action code here
}	},

}

cardScripts.scripts.set("spangler-box", cardScript)