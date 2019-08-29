import {CardActionConfig, CardScript} from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { Creature } from "../../../shared/gamestate/Creature"
import {fullyHealCreature} from "../../ScriptUtils"

const cardScript: CardScript = {
    power: () => 6,
    onDestroyedEnemyInFight: {
        perform: (state: GameState, config: CardActionConfig) => {
            const mugwump = config.thisCard as Creature
            fullyHealCreature(mugwump)
            mugwump.tokens.power += 1
        }
    }
}

cardScripts.scripts.set("mugwump", cardScript)
