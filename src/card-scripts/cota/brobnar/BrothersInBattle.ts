import {CardActionConfig, CardScript} from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import {House} from "../../../shared/keyforge/house/House"
import {GameState} from "../../../shared/gamestate/GameState";
import {enableFighting, friendlyCreatures} from "../../ScriptUtils";

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        selectFromChoices: () => Object.keys(House),
        perform: (state: GameState, config: CardActionConfig) => {
            const chosenHouse = config.selection
            enableFighting(friendlyCreatures(state)
                .filter(creature => creature.backingCard.house == chosenHouse))
        }
    }
}

cardScripts.scripts.set("brothers-in-battle", cardScript)
