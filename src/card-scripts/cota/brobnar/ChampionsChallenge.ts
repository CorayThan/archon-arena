import {CardActionConfig, CardScript} from "../../types/CardScript"
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
import {Creature} from "../../../shared/gamestate/Creature";

const cardScript: CardScript = {
    onPlay: {
        validTargets: (state: GameState) => {
            return getMostPowerful(enemyCreatures(state))
        },
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            if (config.targets.length > 0) {
                const mostPowerfulEnemy = config.targets[0] as Creature
                const enemyTargets = enemyCreatures(state)
                    .filter(creature => creature.id !== mostPowerfulEnemy.id)
                destroyCards(state, enemyTargets)
            }
            return {
                validTargets: (state: GameState) => {
                    return getMostPowerful(friendlyCreatures(state))
                },
                numberOfTargets: () => 1,
                perform: (state1: GameState, config1: CardActionConfig) => {
                    if (config1.targets.length > 0) {
                        const mostPowerfulFriendly = config1.targets[0] as Creature
                        const friendlyTargets = friendlyCreatures(state1)
                            .filter(creature => creature.id !== mostPowerfulFriendly.id)
                        destroyCards(state1, friendlyTargets)
                        readyCreature(mostPowerfulFriendly)
                        fightUsingCreature(mostPowerfulFriendly)
                    }
                }
            }
        }
    }
}

cardScripts.scripts.set("champions-challenge", cardScript)
