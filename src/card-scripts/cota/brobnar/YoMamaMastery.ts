import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { Creature } from "../../../shared/gamestate/Creature"
import {
    fullyHealCreature,
} from "../../ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    taunt: () => true,
    onPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            fullyHealCreature(config.targets[0] as Creature)
        }
    }
}

cardScripts.scripts.set("yo-mama-mastery", cardScript)
