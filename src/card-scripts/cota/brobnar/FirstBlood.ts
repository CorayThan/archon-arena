import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { Creature } from "../../../shared/gamestate/Creature"
import { House } from "../../../shared/keyforge/house/House"
import { allCreatures, dealDamage, friendlyCreatures } from "../../ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    alpha: () => true,
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: (state: GameState) => {
            return friendlyCreatures(state)
                .filter(creature => creature.backingCard.house === House.Brobnar)
                .length
        },
        perform: (state: GameState, config: CardActionConfig) => {
            dealDamage(config.targets! as Creature[], 2)
        }
    }
}

cardScripts.scripts.set("first-blood", cardScript)
