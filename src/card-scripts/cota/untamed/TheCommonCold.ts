import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, dealDamage, destroyCards } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        validTargets: (state: GameState) => allCreatures(state).filter(creature => (creature as Creature).backingCard.house === House.Mars),
        perform: (state: GameState, config: CardActionConfig) => {
            destroyCards(state, config.targets as Creature[])
            dealDamage(allCreatures(state), 1)
        }
    }
}

cardScripts.scripts.set("the-common-cold", cardScript)