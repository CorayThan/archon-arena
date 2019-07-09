import Creature from "./Creature"
import Artifact from "./Artifact"
import CardInHand from "./CardInHand"

export default interface Player {
    name: string,
    creatures: Creature[],
    artifacts: Artifact[],
    hand: CardInHand[],
    drawPile: CardInHand[],
    discardPile: CardInHand[],
    archivePile: CardInHand[],
    purgePile: CardInHand[],
}
