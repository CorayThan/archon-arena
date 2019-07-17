import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../CardScripts"
import {House} from "../../../shared/keyforge/house/House"
import {enableFighting, friendlyCreatures} from "../../ScriptUtils"


const cardScript: CardScript = {
    amber: () => 1,
    omni: {
        numberOfTargets: () => 1,
        perform: (state) => {
            friendlyCreatures(state)
                .filter(creature => creature.backingCard.house == House.Brobnar)
                .forEach(creature => enableFighting(creature))
        }
    }
}

cardScripts.scripts.set("signal-fire", cardScript)