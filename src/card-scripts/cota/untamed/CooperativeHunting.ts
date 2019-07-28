import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { Creature } from "../../../shared/gamestate/Creature"
import { allCreatures, dealDamage, friendlyCreatures } from "../../ScriptUtils"

const cardScript: CardScript = {
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => friendlyCreatures.length,
        perform: (state: GameState, config: CardActionConfig) => {
            dealDamage(config.targets as Creature[], 1)
        }
    }
}

cardScripts.scripts.set("cooperative-hunting", cardScript)