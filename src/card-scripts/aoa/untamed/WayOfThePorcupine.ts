import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	amber: () =>  1,
	hazardous: () =>  true,
//TODO This creature gains Hazardous 3. (Before this creature is attacked, deal 3D to the attacking enemy.)

}

cardScripts.scripts.set("way-of-the-porcupine", cardScript)