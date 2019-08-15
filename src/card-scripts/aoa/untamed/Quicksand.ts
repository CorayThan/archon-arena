import { CardScript } from "../../types/CardScript"
import { GameState } from "../../../shared/gamestate/GameState"
import { allPlayerStates, checkHouse, destroyCards, getMostPowerful } from "../../ScriptUtils"
import { House } from "../../../shared/keyforge/house/House"
import { CardInGame } from "../../../shared/gamestate/CardInGame"
import { cardScripts } from "../../CardScripts"

const cardScript: CardScript = {
    // Play: Destroy the most powerful creature controlled by each player who does not control a ready Untamed creature.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            allPlayerStates(state).forEach(playerState => {
                if (playerState.creatures.some(x => checkHouse(x as CardInGame, House.Untamed) && x.ready)) {
                    destroyCards(state, getMostPowerful(playerState.creatures) as CardInGame[])
                }
            })
        }
    }
}

cardScripts.scripts.set("quicksand", cardScript)
