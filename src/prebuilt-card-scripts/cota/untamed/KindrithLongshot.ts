import { CardScript, CardActionConfig } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    // Elusive. Skirmish.Reap: Deal 2<D> to a creature.
    power: () => 3,
    elusive: () => true,
    skirmish: () => true,
    reap: {
        perform: (state: GameState, config: CardActionConfig) => {
            //Add reap code here
        }
    },
}
cardScripts.scripts.set("kindrith-longshot", cardScript)