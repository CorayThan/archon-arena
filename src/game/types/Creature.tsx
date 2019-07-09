import Upgrade from "./Upgrade"
import Artifact from "./Artifact"
import CardInHand from "./CardInHand"

export default interface Creature {
    name: string,
    id: string,
    ready: boolean,
    faceup: boolean,
    taunt: boolean,
    upgrades: Upgrade[],
    cardsUnderneath: (Creature | Artifact | Upgrade | CardInHand)[],
    tokens: {
        [key: string]: number
    }
}
