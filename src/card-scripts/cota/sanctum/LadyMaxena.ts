import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, putInHand, stunCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"
import { CardInGame } from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
    // Play: Stun a creature. Action: Return Lady Maxena to its owner’s hand.
    power: () => 5,
    armor: () => 2,
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            stunCreatures(config.targets as Creature[])
        }
    },
    action: {
        perform: (state: GameState, config: CardActionConfig) => {
            putInHand(state, [config.thisCard] as CardInGame[])
        }
    }
}

cardScripts.scripts.set("lady-maxena", cardScript)