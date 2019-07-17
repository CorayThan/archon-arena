import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
	omega: () =>  true,
//TODO Omega. (After you play this card,
end this step.)
Return a card from your discard pile to your hand.
	onPlay: {
		(state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("gravid-cycle", cardScript)