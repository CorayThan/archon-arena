import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import {
    destroyCards,
    enemyCreatures,
    fightUsingCreature,
    friendlyCreatures,
    getMostPowerful,
    readyCreature
} from "../../ScriptUtils"

const cardScript: CardScript = {
    onPlay: {
        perform: (state: GameState) => {
            if (enemyCreatures(state).length > 0) {
                const mostPowerfulEnemy = getMostPowerful(enemyCreatures(state))[0]
                const enemyTargets = enemyCreatures(state)
                    .filter(creature => creature.id !== mostPowerfulEnemy.id)
                destroyCards(state, enemyTargets)
            }
            if (friendlyCreatures(state).length > 0) {
                const mostPowerfulFriendly = getMostPowerful(friendlyCreatures(state))[0]
                const friendlyTargets = friendlyCreatures(state)
                    .filter(creature => creature.id !== mostPowerfulFriendly.id)
                destroyCards(state, friendlyTargets)
                readyCreature(mostPowerfulFriendly)
                fightUsingCreature(mostPowerfulFriendly)
            }
        }
    }
}

cardScripts.scripts.set("champions-challenge", cardScript)
