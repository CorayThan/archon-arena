import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { inactivePlayerState } from "../../ScriptUtils"
import { kebabCase } from "lodash"

const cardScript: CardScript = {
    // When you play this card, treat it as a copy of an action card in your opponent’s discard pile.
    //TODO this needs to trigger Before it gets played
    onPlay: {
        validTargets: (state: GameState) => inactivePlayerState(state).discard.filter(x => x.backingCard.cardType === "Action"),
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            cardScripts.scripts.get(kebabCase(config.targets[0].backingCard.cardTitle))
        }
    }
}
cardScripts.scripts.set("mimicry", cardScript)