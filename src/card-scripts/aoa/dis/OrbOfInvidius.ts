import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { stunCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // After a creature reaps, stun it.
    amber: () => 1,
    onAnyReap: {
        perform: (state: GameState, config: CardActionConfig) => {
            stunCreatures([config.triggerCard] as Creature[])
        }
    }
}
cardScripts.scripts.set("orb-of-invidius", cardScript)