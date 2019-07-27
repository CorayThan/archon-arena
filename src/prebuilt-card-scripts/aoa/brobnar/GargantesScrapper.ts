import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Alpha. (You can only play this card before doing anything else this step.) Play: If you have 3A or more, deal 3D to an enemy creature.
    power: () => 3,
    alpha: () => true,
    onPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add onPlay code here
        }
    },
}
cardScripts.scripts.set("gargantes-scrapper", cardScript)