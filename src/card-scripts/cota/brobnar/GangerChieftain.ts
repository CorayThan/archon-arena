import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { Creature } from "../../../shared/gamestate/Creature"
import { fightUsingCreature, getNeighbors, readyCreature } from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 5,
    onPlay: {
        validTargets: (state: GameState, config: CardActionConfig) => {
            return getNeighbors(state, config.thisCard as Creature)
        },
        numberOfTargets: () => 1,
        upToTargets: () => true,
        perform: (state: GameState, config: CardActionConfig) => {
            const targetedCreature = config.targets[0] as Creature
            readyCreature(targetedCreature)
            fightUsingCreature(targetedCreature)
        }
    }
}

cardScripts.scripts.set("ganger-chieftain", cardScript)
