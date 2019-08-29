import {CardScript} from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import {belongsToHouse, enemyCards, steal} from "../../ScriptUtils"
import {House} from "../../../shared/keyforge/house/House";

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            if (enemyCards(state).filter(card => belongsToHouse(card, House.Logos)).length >= 3) {
                steal(state, 2)
            }
        }
    }
}

cardScripts.scripts.set("take-that-smartypants", cardScript)
