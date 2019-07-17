import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {friendlyCreatures} from "../../ScriptUtils"

const cardScript: CardScript = {
    staticEffect: (state) => {
        friendlyCreatures(state).forEach(creature => creature.power += 1)
    }
}

cardScripts.scripts.set("banner-of-battle", cardScript)
