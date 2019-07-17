import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  3,
	armor: () =>  1,
//TODO Play: Archive a card. You may purge an archived card to stun a creature.
	onPlay: {
		perform: (state, config) => {
        //Add onPlay code here
}	},

}

cardScripts.scripts.set("yzphyz-knowdrone", cardScript)