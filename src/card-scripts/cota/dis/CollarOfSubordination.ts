import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, enemyCreatures, friendlyPlayer, moveCreature } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // You control this creature.
    onPlay: {
        validTargets: enemyCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            moveCreature(state, activePlayerState(state), config.targets[0] as Creature)
        }
    },
    destroyed: {
        perform: (state: GameState, config: CardActionConfig) => {
            moveCreature(state, friendlyPlayer(state, config.targets[0]), config.targets[0] as Creature)
        }
    }
}
cardScripts.scripts.set("collar-of-subordination", cardScript)