import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {fightUsingCreature, friendlyCreatures, getNeighbors, readyCreature} from "../../ScriptUtils"

import {Creature} from "../../../shared/gamestate/Creature";

const cardScript: CardScript = {
    power: () => 3,
    fight: {
        validTargets: (state, config) => {
            return getNeighbors(friendlyCreatures(state), config.thisCard as Creature)
                .filter(creature => creature.backingCard.traits.includes("Giant"))
        },
        numberOfTargets: () => 1,
        perform: (state, config) => {
            readyCreature(config.targets[0] as Creature)
            fightUsingCreature(config.targets[0] as Creature)
        }
    },
    reap: {
        validTargets: (state, config) => {
            return getNeighbors(friendlyCreatures(state), config.thisCard as Creature)
                .filter(creature => creature.backingCard.traits.includes("Giant"))
        },
        numberOfTargets: () => 1,
        perform: (state, config) => {
            readyCreature(config.targets[0] as Creature)
            fightUsingCreature(config.targets[0] as Creature)
        }
    }
}

cardScripts.scripts.set("war-grumpus", cardScript)