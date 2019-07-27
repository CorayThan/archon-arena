import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, destroyCards, getLeastPowerful } from "../../ScriptUtils"

const cardScript: CardScript = {
    // Play/Fight/Reap: Destroy the least powerful creature.
    power: () => 5,
    onPlay: {
        perform: (state: GameState) => {
            destroyCards(state, getLeastPowerful(allCreatures(state)))
        }
    },
    reap: {
        perform: (state: GameState) => {
            destroyCards(state, getLeastPowerful(allCreatures(state)))
        }
    },
    fight: {
        perform: (state: GameState) => {
            destroyCards(state, getLeastPowerful(allCreatures(state)))
        }
    }
}

cardScripts.scripts.set("horseman-of-famine", cardScript)