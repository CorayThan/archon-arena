import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, allCreatures, checkHouse, destroyCards, modifyAmber } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"
import { CardInGame } from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
    // Play: Choose one: destroy each Dis creature, or gain 1<A>.
    onPlay: {
        selectFromChoices: () => ['Destroy all Dis', 'Gain 1 Æmber'],
        perform: (state: GameState, config: CardActionConfig) => {
            if (config.selection === 'Destroy All Dis') {
                const targets = allCreatures(state)
                    .filter(x => checkHouse(x, House.Dis))
                destroyCards(state, targets as CardInGame[])
            } else modifyAmber(activePlayerState(state), 1)
        }
    }
}

cardScripts.scripts.set("begone", cardScript)