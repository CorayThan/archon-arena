import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {friendlyCreatures} from "../../types/ScriptUtils"

const cardScript: CardScript = {
    power: () => 6,
    staticEffect: (state) => {
        friendlyCreatures(state)
            .filter(creature => creature.traits.includes("Beast"))
            .forEach(creature => creature.power += 1)
        friendlyCreatures(state)
            .filter(creature => creature.traits.includes("Niffle"))
            .forEach(creature => creature.power += 1)
    }
}

cardScripts.scripts.set("niffle-queen", cardScript)