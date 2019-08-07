import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, checkHouse, dealDamage, enemyCreatures, revealCards } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Action: Reveal any number of Mars cards from your hand. Deal damage to a creature equal to the number of Mars cards revealed this way.
    //TODO this doesn't let you select the number of cards to reveal.
    action: {
        validTargets: (state: GameState) => activePlayerState(state).hand
            .filter(x => checkHouse(x, House.Mars)),
        numberOfTargets: (state: GameState) => activePlayerState(state).hand
            .filter(x => checkHouse(x, House.Mars)).length,
        upToTargets: () => true,
        perform: (state: GameState, config0: CardActionConfig) => {
            revealCards(state, config0.targets)
            return {
                validTargets: enemyCreatures,
                numberOfTargets: () => 1,
                perform: (state: GameState, config1: CardActionConfig) => {
                    dealDamage(config1.targets as Creature[], config0.targets.length)
                }
            }
        }
    }
}

cardScripts.scripts.set("mothergun", cardScript)