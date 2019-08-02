import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { friendlyCreatures, readyCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // This creature gains, “Action: Swap this creature with another friendly creature in the battleline. You may use that other creature this turn.”
    //TODO not sure if these indexs work with the upgraded card
    amber: () => 1,
    action: {
        validTargets: friendlyCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            const thisIndex = friendlyCreatures(state).findIndex(x => x.id === config.thisCard.id)
            const targetIndex = friendlyCreatures(state).findIndex(x => x.id === config.targets[0].id)
            friendlyCreatures(state).splice(thisIndex, 1, config.targets[0] as Creature)
            friendlyCreatures(state).splice(targetIndex, 1, config.thisCard as Creature)
            readyCreatures(config.targets as Creature[])
        }
    }
}
cardScripts.scripts.set("transposition-sandals", cardScript)