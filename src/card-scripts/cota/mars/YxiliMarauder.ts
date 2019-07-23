import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { alterPower, captureAmber, friendlyCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Yxili Marauder gets +1 power for each <A> on it.
    // Play: Capture 1<A> for each friendly ready Mars creature.
    power: () => 2,
    staticEffect: (state, config) => {
        alterPower([config.thisCard] as Creature[], (config.thisCard as Creature).tokens.amber)
    },
    onPlay: {
        perform: (state, config) => {
            const targets = friendlyCreatures(state).filter(x => {
                return x.ready && (x.backingCard.house === House.Mars)
            })
            captureAmber(state, config.thisCard as Creature, targets.length)
        }
    }
}

cardScripts.scripts.set("yxili-marauder", cardScript)