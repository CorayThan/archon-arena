import {CardActionConfig, CardScript} from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import {belongsToHouse, friendlyCreatures, putInHand} from "../../ScriptUtils"
import {House} from "../../../shared/keyforge/house/House";

const cardScript: CardScript = {
    power: () => 3,
    onPlay: {
        perform: (state: GameState, config: CardActionConfig) => {
            putInHand(state, friendlyCreatures(state)
                .filter(creature => belongsToHouse(creature, House.Brobnar))
                .filter(creature => creature.id !== config.thisCard.id))
        }
    }
}

cardScripts.scripts.set("wardrummer", cardScript)
