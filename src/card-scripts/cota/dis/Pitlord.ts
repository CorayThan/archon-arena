import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  2,
	power: () =>  9,
	taunt: () =>  true,
//TODO Taunt. (This creature’s neighbors cannot be attacked unless they have taunt.)While Pitlord is in play you must choose Dis as your active house.

}

cardScripts.scripts.set("pitlord", cardScript)