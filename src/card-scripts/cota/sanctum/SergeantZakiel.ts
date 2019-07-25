import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { fightUsingCreature, friendlyCreatures, getNeighbors } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: You may ready and fight with a neighboring creature.
    power: () => 4,
    armor: () => 1,
    onPlay: {
        validTargets: (state, config) => getNeighbors(friendlyCreatures(state), config.thisCard as Creature),
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            fightUsingCreature(config.targets[0] as Creature)
        }
    }
}

cardScripts.scripts.set("sergeant-zakiel", cardScript)