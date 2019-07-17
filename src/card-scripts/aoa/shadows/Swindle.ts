import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	alpha: () =>  true,
	omega: () =>  true,
//TODO Alpha. (You can only play this card before doing anything else this step.)
Omega. (After you play this card,
end this step.)
Steal 3A.
	onPlay: {
		(state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("swindle", cardScript)