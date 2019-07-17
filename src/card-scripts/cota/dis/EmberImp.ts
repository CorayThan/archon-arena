import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  2,
//TODO Your opponent cannot play more than 2 cards each turn.

}

cardScripts.scripts.set("ember-imp", cardScript)