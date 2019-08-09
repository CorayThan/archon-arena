import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, modifyAmber } from "../../ScriptUtils"

//TODO make this work
const creaturesPlayed = false

const cardScript: CardScript = {
    // Skirmish. (When you use this creature to fight, it is dealt no damage in return.)
    // At the end of your turn, if you did not play any creatures this turn, gain 1A.
    power: () => 3,
    skirmish: () => true,
    atEndOfYourTurn: {
        perform: (state: GameState) => {
            if (creaturesPlayed) {
                modifyAmber(activePlayerState(state), 1)
            }
        }
    }
}
cardScripts.scripts.set("redlock", cardScript)