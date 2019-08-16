import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, enemyCreatures, exhaustCards, stunCreatures } from "../../ScriptUtils"

import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Bigtwig can only fight stunned creatures. Reap: Stun and exhaust a creature.
    power: () => 7,
    validAttackTargets: (state: GameState) => enemyCreatures(state).filter(creature => creature.tokens.stun > 0),
    reap: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            stunCreatures(config.targets as Creature[])
            exhaustCards(config.targets as Creature[])
        }
    }
}

cardScripts.scripts.set("bigtwig", cardScript)