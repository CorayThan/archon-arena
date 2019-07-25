import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, destroyCards } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    onPlay: {
        validTargets: allCreatures,
        perform: (state: GameState, config: CardActionConfig) => {
            const damagedCreatures = config.targets.filter(target => (target as Creature).tokens.damage > 0)
            destroyCards(state, damagedCreatures)
        },
    }
}

cardScripts.scripts.set("save-the-pack", cardScript)