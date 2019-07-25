import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { fightUsingCreatures, friendlyCreatures, getNeighbors, readyCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Deploy. (This creature can enter play anywhere in your battleline.)
    // Play/Fight/Reap: You may ready and fight with a neighboring creature.
    power: () => 2,
    deploy: () => true,
    onPlay: {
        validTargets: (state, config) => getNeighbors(friendlyCreatures(state), config.thisCard as Creature),
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            readyCreatures(config.targets as Creature[])
            fightUsingCreatures(config.targets as Creature[])
        }
    },
    reap: {
        validTargets: (state, config) => getNeighbors(friendlyCreatures(state), config.thisCard as Creature),
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            readyCreatures(config.targets as Creature[])
            fightUsingCreatures(config.targets as Creature[])
        }
    },
    fight: {
        validTargets: (state, config) => getNeighbors(friendlyCreatures(state), config.thisCard as Creature),
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            readyCreatures(config.targets as Creature[])
            fightUsingCreatures(config.targets as Creature[])
        }
    }
}

cardScripts.scripts.set("the-grey-rider", cardScript)