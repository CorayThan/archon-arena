import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  4,
	armor: () =>  1,
//TODO Your <A> cannot be stolen.

}

cardScripts.scripts.set("the-vaultkeeper", cardScript)