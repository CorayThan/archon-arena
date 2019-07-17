import {cardScripts} from "../../types/CardScripts"
import {CardScript} from "../../types/CardScript"
import {Creature} from "../../../shared/gamestate/Creature"
import {friendlyCreatures, putInHand} from "../../types/ScriptUtils"

const cardScript: CardScript = {
    //TODO would be nice to not have to duplicate this three times over, without making a dedicated function in ScriptUtils for this...
    onPlay: {
        validTargets: (state, config) => {
            const friendlies = friendlyCreatures(state)
            return friendlies
            .filter(creature => creature.traits.includes("Giant") && creature.id !== config.thisCard.id)

        },
        numberOfTargets: () => 1,
        perform: (state, config) => {
            const targetedGiant = config.targets[0] as Creature
            putInHand(targetedGiant)
        }
    },
    fight: {
        validTargets: (state, config) => {
            const friendlies = friendlyCreatures(state)
            return friendlies
                .filter(creature => creature.traits.includes("Giant") && creature.id !== config.thisCard.id)

        },
        numberOfTargets: () => 1,
        perform: (state, config) => {
            const targetedGiant = config.targets[0] as Creature
            putInHand(targetedGiant)
        }
    },
    reap: {
        validTargets: (state, config) => {
            const friendlies = friendlyCreatures(state)
            return friendlies
                .filter(creature => creature.traits.includes("Giant") && creature.id !== config.thisCard.id)

        },
        numberOfTargets: () => 1,
        perform: (state, config) => {
            const targetedGiant = config.targets[0] as Creature
            putInHand(targetedGiant)
        }
    }
}

cardScripts.scripts.set("drummernaut", cardScript)