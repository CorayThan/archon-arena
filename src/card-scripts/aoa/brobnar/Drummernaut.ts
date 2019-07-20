import {cardScripts} from "../../CardScripts"
import {CardScript} from "../../types/CardScript"
import {friendlyCreatures, putInHand} from "../../ScriptUtils"


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
            putInHand(state, config.targets)
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
            putInHand(state, config.targets)
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
            putInHand(state, config.targets)
        }
    }
}

cardScripts.scripts.set("drummernaut", cardScript)