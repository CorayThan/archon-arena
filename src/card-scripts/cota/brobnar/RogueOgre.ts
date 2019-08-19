import {CardActionConfig, CardScript} from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import {captureAmber, healCreature, numberOfCardsPlayedThisTurn} from "../../ScriptUtils"
import {Creature} from "../../../shared/gamestate/Creature";

const cardScript: CardScript = {
    power: () => 6,
    atEndOfYourTurn: {
        perform: (state: GameState, config: CardActionConfig) => {
            if (numberOfCardsPlayedThisTurn(state) === 1) {
                healCreature(config.thisCard as Creature, 2)
                captureAmber(state, config.thisCard as Creature, 1)
            }
        }
    }
}

cardScripts.scripts.set("rogue-ogre", cardScript)
