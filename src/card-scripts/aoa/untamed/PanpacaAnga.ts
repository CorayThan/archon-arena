import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  5,
//TODO Creatures to the right of Panpaca, Anga in the battleline get +2 power.

}

cardScripts.scripts.set("panpaca-anga", cardScript)