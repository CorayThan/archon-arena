import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Yxili Marauder gets +1 power for each <A> on it.Play: Capture 1<A> for each friendly ready Mars creature.
    power: () => 2,
    onPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add onPlay code here
        }
    },
}
cardScripts.scripts.set("yxili-marauder", cardScript)