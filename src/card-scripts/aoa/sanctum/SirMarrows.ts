import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  4,
	armor: () =>  2,
//TODO After your opponent gains A by reaping, Sir Marrows captures it.

}

cardScripts.scripts.set("sir-marrows", cardScript)