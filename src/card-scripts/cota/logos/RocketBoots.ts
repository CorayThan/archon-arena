import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { readyCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const effect = {
    perform: (state: GameState, config: CardActionConfig) => {
        //TODO list of action done this turn
        const usedThisTurn = true
        if (!usedThisTurn) {
            readyCreatures([config.thisCard] as Creature[])
        }

    }
}
const cardScript: CardScript = {
    // This creature gains, “Fight/Reap: If this is the first time this creature was used this turn, ready it.”
    reap: effect,
    fight: effect
}
cardScripts.scripts.set("rocket-boots", cardScript)