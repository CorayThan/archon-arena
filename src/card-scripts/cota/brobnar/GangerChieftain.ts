import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { Creature } from "../../../shared/gamestate/Creature"
import { friendlyCreatures, readyCreature, fightUsingCreature, getNeighbors } from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 5,
    onPlay: {
        validTargets: (state, config) => {
            return getNeighbors(friendlyCreatures(state), config.thisCard as Creature)
        },
        numberOfTargets: () => 1,
        perform: (state, config) => {
            const targetedCreature = config.targets![0] as Creature
            readyCreature(targetedCreature)
            fightUsingCreature(targetedCreature)
        }
    }
}

cardScripts.scripts.set("ganger-chieftain", cardScript)
