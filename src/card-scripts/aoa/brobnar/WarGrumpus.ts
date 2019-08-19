import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { Creature } from "../../../shared/gamestate/Creature"
import {fightUsingCreature, friendlyCreatures, getNeighbors, hasTrait, readyCreature} from "../../ScriptUtils"

const effect = {
    validTargets: (state: GameState, config: CardActionConfig) => {
        return getNeighbors(state, config.thisCard as Creature)
            .filter(neighbor => hasTrait(neighbor, "Giant"))
    },
    numberOfTargets: () => 1,
    perform: (state: GameState, config: CardActionConfig) => {
        const targetedCreature = config.targets[0] as Creature
        readyCreature(targetedCreature)
        fightUsingCreature(targetedCreature)
    }
},

cardScript: CardScript = {
    power: () => 3,
    fight: effect,
    reap: effect
}

cardScripts.scripts.set("war-grumpus", cardScript)
