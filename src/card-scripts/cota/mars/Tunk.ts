import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  6,
	armor: () =>  1,
//TODO After you play another Mars creature, fully heal Tunk.

}

cardScripts.scripts.set("tunk", cardScript)