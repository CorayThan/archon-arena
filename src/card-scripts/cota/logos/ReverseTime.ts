import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"

const cardScript: CardScript = {
    amber: () =>  0,
    onPlay: {

    }
}

cardScripts.scripts.set("reverse-time", cardScript)