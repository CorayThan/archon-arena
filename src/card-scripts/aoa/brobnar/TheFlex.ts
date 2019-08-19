import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, exhaustCards, friendlyCreatures, modifyAmber } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    onPlay: {
        validTargets: (state: GameState) => {
            return friendlyCreatures(state).filter(creature => creature.backingCard.house === House.Brobnar
                && creature.ready)
        },
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            const target = config.targets[0] as Creature
            exhaustCards([target])
            modifyAmber(activePlayerState(state), Math.floor(target.power / 2))
        }
    }
}

cardScripts.scripts.set("the-flex", cardScript)
