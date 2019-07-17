import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  4,
//TODO Each time a creature is destroyed,
its owner gains 1A.

}

cardScripts.scripts.set("neffru", cardScript)