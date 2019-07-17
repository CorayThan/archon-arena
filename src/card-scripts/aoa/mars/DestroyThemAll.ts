import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
//TODO Play: Destroy an artifact, a creature,
and an upgrade.
	onPlay: {
		(state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("destroy-them-all", cardScript)