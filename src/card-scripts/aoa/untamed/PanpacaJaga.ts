import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  3,
	skirmish: () =>  true,
//TODO Skirmish.
Creatures to the left of Panpaca,
Jaga in the battleline gain skirmish.

}

cardScripts.scripts.set("panpaca-jaga", cardScript)