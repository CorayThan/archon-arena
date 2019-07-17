import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO The first creature played each turn enters play ready.

}

cardScripts.scripts.set("speed-sigil", cardScript)