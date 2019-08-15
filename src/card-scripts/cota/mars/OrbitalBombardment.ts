import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, allCreatures, dealDamage, revealCards } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Reveal any number of Mars cards from your hand. For each card revealed this way, deal 2<D> to a creature.
    // (You may choose a different creature each time.)
    amber: () => 1,
    onPlay: {
        validTargets: (state: GameState) => activePlayerState(state).hand.filter(x => x.backingCard.house === House.Mars),
        numberOfTargets: (state: GameState) => activePlayerState(state).hand.filter(x => x.backingCard.house === House.Mars).length,
        upToTargets: () => true,
        perform: (state: GameState, config: CardActionConfig) => {
            revealCards(state, config.targets)
            return {
                validTargets: allCreatures,
                numberOfTargets: () => config.targets.length,
                uniqueTargets: () => false,
                perform: (targetState: GameState, targetConfig: CardActionConfig) => {
                    dealDamage(targetConfig.targets as Creature[], 2)
                }
            }
        }
    }
}

cardScripts.scripts.set("orbital-bombardment", cardScript)