import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures, destroyCard } from "../../ScriptUtils"

const cardScript: CardScript = {
    amber: () => 1,
    onPlay: {
        perform: (state: GameState) => {
            const creaturesInPlay = allCreatures(state)
            creaturesInPlay
                .filter(creature => creature.traits.includes("Scientist"))
                .forEach(creature => destroyCard(creature))
        }
    }
}

cardScripts.scripts.set("curiosity", cardScript)