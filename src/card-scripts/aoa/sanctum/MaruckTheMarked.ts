import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  5,
	armor: () =>  1,
//TODO After Maruck the Marked prevents damage with its armor, capture 1A for each damage just prevented.

}

cardScripts.scripts.set("maruck-the-marked", cardScript)