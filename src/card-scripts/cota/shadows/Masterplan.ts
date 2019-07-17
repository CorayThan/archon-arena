import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO Play: Put a card from your hand facedown beneath Masterplan.Omni: Play the card beneath Masterplan. Sacrifice Masterplan.
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},
	omni: {
		perform: (state, config) => {
        //Add omni code here
}	},

}

cardScripts.scripts.set("masterplan", cardScript)