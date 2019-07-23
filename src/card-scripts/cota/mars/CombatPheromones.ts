import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { destroyCards, enableUse, friendlyArtifacts, friendlyCreatures } from "../../ScriptUtils"
import { CardInGame } from "../../../shared/gamestate/CardInGame"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Omni: Sacrifice Combat Pheromones. You may use up to 2 other Mars cards this turn.
    amber: () => 1,
    omni: {
        validTargets: (state) => (friendlyCreatures(state) as CardInGame[]).concat(friendlyArtifacts(state) as CardInGame[]),
        numberOfTargets: () => 2,
        upToTargets: () => true,
        perform: (state, config) => {
            enableUse(config.targets as Creature[])
            destroyCards(state, [config.thisCard])
        }
    }
}

cardScripts.scripts.set("combat-pheromones", cardScript)