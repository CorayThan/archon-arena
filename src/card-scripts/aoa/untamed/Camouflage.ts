import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO Creatures not on a flank cannot fight this creature.

}

cardScripts.scripts.set("camouflage", cardScript)