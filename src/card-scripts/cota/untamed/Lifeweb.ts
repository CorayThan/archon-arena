import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        perform: (state, config) => {
            //TODO
        }
    }
}

cardScripts.scripts.set("lifeweb", cardScript)