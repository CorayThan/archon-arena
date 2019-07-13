import { cardScripts } from "../../types/CardScripts"
import { CardScript, TargetType, TargetArea } from "../../types/CardScript"
import { Creature } from "../../../shared/gamestate/Creature"
import { getMostPowerful, enemyCreatures, friendlyCreatures, destroyCard, readyCreature, fightUsingCreature } from "../../types/ScriptUtils"
import { GameState } from "../../../shared/gamestate/GameState"

const cardScript: CardScript = {
    onPlay: {
        perform: (state, config) => {
            const mostPowerfulEnemy = getMostPowerful(enemyCreatures(state), 1)[0]
            enemyCreatures(state)
            .filter(creature => creature.id !== mostPowerfulEnemy.id)
            .forEach(creature => destroyCard(creature))
            const mostPowerfulFriendly = getMostPowerful(friendlyCreatures(state), 1)[0]
            friendlyCreatures(state)
            .filter(creature => creature.id !== mostPowerfulFriendly.id)
            .forEach(creature => destroyCard(creature))
            readyCreature(mostPowerfulFriendly)
            fightUsingCreature(mostPowerfulFriendly)
        }
    }
}

cardScripts.scripts.set("champions-challenge", cardScript)