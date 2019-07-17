import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  4,
	armor: () =>  2,
//TODO Staunch Knight gets +2 power while it is on a flank.

}

cardScripts.scripts.set("staunch-knight", cardScript)