import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	omega: () =>  true,
//TODO Omega. (After you play this card,
end this step.)
Destroy each creature.
	onPlay: {
		(state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("unlocked-gateway", cardScript)