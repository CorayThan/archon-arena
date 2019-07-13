import { cardScripts } from "../../types/CardScripts"
import { CardScript, TargetType, TargetArea } from "../../types/CardScript"
import { Creature } from "../../../shared/gamestate/Creature"
import { friendlyCreatures, enemyCreatures, destroyCard, activePlayerState, gainChains } from "../../types/ScriptUtils"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    onPlay: {
        perform: (state, config) => {
        	const creaturesInPlay = friendlyCreatures(state).concat(enemyCreatures(state))
        	creaturesInPlay
        	.filter(creature => creature.tokens.damage === 0)
        	.forEach(creature => destroyCard(creature))
        	gainChains(activePlayerState(state), 3)
        }
    }
}

cardScripts.scripts.set("cowards-end", cardScript)