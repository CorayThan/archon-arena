import BaseCard, { CardInput } from "./BaseCard"
import CardImage from "./CardImage"
import { CARD_HEIGHT, CARD_WIDTH } from "../constants"

class Card extends BaseCard {

    constructor(data: CardInput) {
        data.cardImage = new CardImage(data.scene, 0, 0, data.id, data.backingCard.house, data.backingCard.maverick, data.back, data.faceup!)
        data.width = CARD_WIDTH
        data.height = CARD_HEIGHT
        super(data)
    }
}

export default Card
