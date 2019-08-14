import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, destroyCard } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        //TODO add elusive to Creature
        validTargets: (state: GameState) => allCreatures(state).filter(creature => (creature as Creature).elusive),
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            config.targets.forEach(target => destroyCard(state, target as Creature))
        },
    }
}

cardScripts.scripts.set("perilous-wild", cardScript)
