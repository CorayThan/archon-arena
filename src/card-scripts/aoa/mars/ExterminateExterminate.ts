import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, totalPower, destroyCards, friendlyCreatures } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Play: For each friendly Mars creature you control, destroy a non-Mars creature with lower power.
    onPlay: {
        numberOfTargets: () => 1,
        validTargets: (state: GameState, config: CardActionConfig) => {
            return allCreatures(state).filter(x => {
                const sortedCreatures = friendlyCreatures(state)
                    .filter(y => (y.backingCard.house === House.Mars))
                    .sort((a, b) => totalPower(a) - totalPower(b))
                const highestPowerCreature = sortedCreatures[config.timesExecuted]
                return (x.backingCard.house !== House.Mars && totalPower(x) < totalPower(highestPowerCreature))
            })
        },
        timesToExecute: (state) => friendlyCreatures(state).filter(x => x.backingCard.house === House.Mars).length,
        perform: (state: GameState, config: CardActionConfig) => {
            destroyCards(state, config.targets)
        }
    }
}

cardScripts.scripts.set("exterminate-exterminate", cardScript)