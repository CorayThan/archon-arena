import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, allCreatures, dealDamage, purgeCards } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Deal 2D to a creature.
    // You may purge any number of cards from your archives to deal an additional 2D to the same creature for each card purged this way.
    amber: () => 1,
    onPlay: {
        validTargets: allCreatures,
        upToTargets: () => true,
        numberOfTargets: () => 1,
        perform: (state: GameState, config0: CardActionConfig) => {
            return {
                validTargets: (state: GameState) => activePlayerState(state).archives,
                upToTargets: () => true,
                perform: (state: GameState, config1: CardActionConfig) => {
                    const purgedCards = purgeCards(state, config1.targets)
                    dealDamage(config0.targets as Creature[], 2 + 2 * purgedCards.length)
                }
            }
        }
    }
}

cardScripts.scripts.set("destructive-analysis", cardScript)