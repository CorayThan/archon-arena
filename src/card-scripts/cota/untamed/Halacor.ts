import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {friendlyCreatures, onFlank} from "../../types/ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    power: () => 4,
    staticEffect: (state) => {
        friendlyCreatures(state)
            .filter(creature => onFlank(friendlyCreatures(state), creature as Creature))
            .forEach(creature => creature.skirmish = true)
    }
}

cardScripts.scripts.set("halacor", cardScript)