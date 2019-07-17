import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {friendlyCreatures, onFlank} from "../../types/ScriptUtils"

const cardScript: CardScript = {
    power: () => 4,
    staticEffect: (state) => {
        onFlank(friendlyCreatures(state)).forEach(creature => creature.skirmish = true)
    }
}

cardScripts.scripts.set("halacor", cardScript)