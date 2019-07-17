import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO Each friendly Knight creature gets +1 power and gains taunt.

}

cardScripts.scripts.set("round-table", cardScript)