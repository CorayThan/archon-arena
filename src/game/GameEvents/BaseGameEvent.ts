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

    async perform(context?: any) {
        await this.triggerBeforeEvents(context)
        await this.resolve(context)
        await this.triggerWhenEvents(context)
        await this.triggerAfterEvents(context)
        await this.finish(context)
    }

    async triggerBeforeEvents(context?: any) {}
    async resolve(context?: any) {}
    async triggerWhenEvents(context?: any) {}
    async triggerAfterEvents(context?: any) {}
    async finish(context?: any) {
        this.successful = true
    }
}
