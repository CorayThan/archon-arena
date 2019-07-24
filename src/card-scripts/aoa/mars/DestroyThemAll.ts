import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Play: Destroy an artifact, a creature, and an upgrade.
    //TODO Its too late to deal with this one
    // onPlay: {
    //     perform: (state, config) => {
    //         //Add onPlay code here
    //     }
    // }
}

cardScripts.scripts.set("destroy-them-all", cardScript)