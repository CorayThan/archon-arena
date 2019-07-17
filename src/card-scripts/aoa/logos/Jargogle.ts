import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  2,
	elusive: () =>  true,
//TODO Elusive.
Play: Put a card from your hand facedown under Jargogle.
Destroyed: If it is your turn, play the card under Jargogle; otherwise, archive that card.
	onPlay: {
		(state, config) => {
        //Add onPlay code here
}	},
	{
		(state, config) => {
        //Add destroyed code here
}	},

}

cardScripts.scripts.set("jargogle", cardScript)