import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { friendlyPlayer, moveCreature } from "../../ScriptUtils"
import { GameState } from "../../../shared/gamestate/GameState"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // After an enemy creature is destroyed fighting Overlord Greking, put that creature into play under your control.
    //TODO make this a new creature
    power: () => 7,
    onDestroyedEnemyInFight: {
        perform: (state: GameState, config: CardActionConfig) => {
            moveCreature(state, friendlyPlayer(state, config.thisCard), config.triggerCard as Creature)
        }
    }
}
cardScripts.scripts.set("overlord-greking", cardScript)