import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
//TODO This creature gets +1 armor and gains taunt. (This creature’s neighbors cannot be attacked unless they have taunt.)

}

cardScripts.scripts.set("protect-the-weak", cardScript)