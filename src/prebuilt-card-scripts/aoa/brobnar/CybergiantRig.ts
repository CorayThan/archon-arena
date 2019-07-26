import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // This creature gains, “At the end of your turn, this creature loses a +1 power counter.” Play: Fully heal this creature and give it a +1 power counter for each damage healed.
    amber: () => 1,
    onPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add onPlay code here
        }
    },
}
cardScripts.scripts.set("cybergiant-rig", cardScript)