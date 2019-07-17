import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  6,
	armor: () =>  1,
//TODO Storm Crawler only deals 1D when fighting.
After an enemy creature reaps, stun it.

}

cardScripts.scripts.set("storm-crawler", cardScript)