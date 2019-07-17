import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  2,
	skirmish: () =>  true,
//TODO Skirmish.
Scowly Caper enters play under your opponent’s control and can be used as if it belonged to any house.
At the end of your turn, destroy one of
Scowly Caper’s neighbors.

}

cardScripts.scripts.set("scowly-caper", cardScript)