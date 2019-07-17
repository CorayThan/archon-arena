import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"

const cardScript: CardScript = {
	power: () =>  3,
	hazardous: () =>  true,
//TODO Assault 3. (Before this creature attacks, deal 3D to the attacked enemy.)
Hazardous 3. (Before this creature is attacked, deal 3D to the attacking enemy.)

}

cardScripts.scripts.set("fanghouse", cardScript)