import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  4,
	armor: () =>  1,
	deploy: () =>  true,
//TODO Deploy. (This creature can enter play anywhere in your battleline.)
“Lion” Bautrem’s neighbors get +2 power.

}

cardScripts.scripts.set("lion-bautrem", cardScript)