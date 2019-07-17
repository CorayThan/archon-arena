import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO When a creature would enter a discard pile from play, it is purged instead.

}

cardScripts.scripts.set("annihilation-ritual", cardScript)