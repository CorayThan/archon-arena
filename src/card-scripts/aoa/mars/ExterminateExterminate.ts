import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { allCreatures, creatureTotalPower, destroyCards, friendlyCreatures } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Play: For each friendly Mars creature you control, destroy a non-Mars creature with lower power.
    onPlay: {
        numberOfTargets: () => 1,
        validTargets: (state, config) => {
            return allCreatures(state).filter(x => {
                const sortedCreatures = friendlyCreatures(state)
                    .filter(y => (y.backingCard.house === House.Mars))
                    .sort((a, b) => creatureTotalPower(a) - creatureTotalPower(b))
                const highestPowerCreature = sortedCreatures[config.timesExecuted]
                return (x.backingCard.house !== House.Mars && creatureTotalPower(x) < creatureTotalPower(highestPowerCreature))
            })
        },
        timesToExecute: (state) => friendlyCreatures(state).filter(x => x.backingCard.house === House.Mars).length,
        perform: (state, config) => {
            destroyCards(state, config.targets)
        }
    }
}

cardScripts.scripts.set("exterminate-exterminate", cardScript)