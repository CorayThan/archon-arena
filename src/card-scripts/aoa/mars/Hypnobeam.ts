import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, enemyCreatures, friendlyCreatures, inactivePlayerState } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Gain control of an enemy creature.
    onPlay: {
        validTargets: enemyCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            const index = enemyCreatures(state).findIndex(x => x.id === (config.targets[0] as Creature).id)
            const creature = enemyCreatures(state).slice(index, index + 1)
            inactivePlayerState(state).creatures = enemyCreatures(state).splice(index, 1)
            //TODO add choice for which flank to move the creature to
            activePlayerState(state).creatures = friendlyCreatures(state).concat(creature)
        }
    },

}

cardScripts.scripts.set("hypnobeam", cardScript)