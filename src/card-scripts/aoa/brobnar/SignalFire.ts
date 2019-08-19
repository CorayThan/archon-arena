import {CardActionConfig, CardScript} from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import {belongsToHouse, destroyCard, enableFighting, friendlyCreatures} from "../../ScriptUtils"
import {House} from "../../../shared/keyforge/house/House";

const cardScript: CardScript = {
    amber: () => 1,
    omni: {
        perform: (state: GameState, config: CardActionConfig) => {
            destroyCard(state, config.thisCard)
            enableFighting(friendlyCreatures(state)
                .filter(creature => belongsToHouse(creature, House.Brobnar)))
        }
    }
}

cardScripts.scripts.set("signal-fire", cardScript)
