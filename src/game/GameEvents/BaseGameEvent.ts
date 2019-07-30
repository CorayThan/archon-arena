import { cardScripts } from "../../card-scripts/CardScripts"
import { CardInGame } from "../../shared/gamestate/CardInGame"
import { GameState  } from "../../shared/gamestate/GameState"

export default class BaseGameEvent {
    successful: boolean
    cardScript: any

    constructor(public state: GameState, public card: CardInGame) {
        this.successful = false
        this.cardScript = cardScripts.scripts.get(card.backingCard.cardTitle.replace(/ /g, "-").toLowerCase())
    }

    async perform() {
        await this.triggerBeforeEvents()
        await this.resolve()
        await this.triggerWhenEvents()
        await this.triggerAfterEvents()
        await this.finish()
    }

    async triggerBeforeEvents() {}
    async resolve() {}
    async triggerWhenEvents() {}
    async triggerAfterEvents() {}
    async finish() {
        this.successful = true
    }
}
