import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  9,
	armor: () =>  1,
	taunt: () =>  true,
//TODO Taunt. (This creature’s neighbors cannot be attacked unless they have taunt.)Yxilx Dominator enters play stunned. 

}

cardScripts.scripts.set("yxilx-dominator", cardScript)