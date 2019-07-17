import {CardScript} from "../../types/CardScript"
import {cardScripts} from "../../types/CardScripts"
import {enemyCreatures} from "../../types/ScriptUtils"
import {House} from "../../../shared/keyforge/house/House";

const cardScript: CardScript = {
    power: () => 7,
    staticEffect: (state) => {
        enemyCreatures(state)
            .filter(creature => creature.backingCard.house === House.Brobnar)
            .forEach(creature => creature.power -= 2)
    }
}

cardScripts.scripts.set("king-of-the-crag", cardScript)