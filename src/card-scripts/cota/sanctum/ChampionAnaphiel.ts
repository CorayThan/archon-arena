import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  6,
	armor: () =>  1,
	taunt: () =>  true,
//TODO Taunt. (This creature’s neighbors cannot be attacked unless they have taunt.)

}

cardScripts.scripts.set("champion-anaphiel", cardScript)