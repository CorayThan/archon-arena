import Upgrade from "./Upgrade"
import Creature from "./Creature"
import CardInHand from "./CardInHand"

export default interface Artifact {
    name: string,
    id: string,
    ready: boolean,
    faceup: boolean,
    cardsUnderneath: (Creature | Artifact | Upgrade | CardInHand)[],
    tokens: {
        amber: number
    }
}
