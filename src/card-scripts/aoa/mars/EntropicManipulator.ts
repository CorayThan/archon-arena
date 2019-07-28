import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { activePlayerState, enemyCreatures, friendlyCreatures, inactivePlayerState } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Choose a player. You may redistribute the damage on the creatures that player controls among that player’s creatures.
    // (You may cause more damage to a creature than it has power.)
    amber: () => 1,
    onPlay: {
        //TODO Selected friendly or enemy targets not sure if this would work
        selectFromChoices: () => ['Opponent', 'Myself'],
        validTargets: (state: GameState, config: CardActionConfig) => config.selection === 'Myself' ? friendlyCreatures(state) : enemyCreatures(state),
        numberOfTargets: (state: GameState, config: CardActionConfig) => {
            return (config.selection === 'Myself' ? friendlyCreatures(state) : enemyCreatures(state)).reduce((a, b) => a + b.tokens.damage, 0)
        },
        uniqueTargets: () => false,
        perform: (state: GameState, config: CardActionConfig) => {
            const playerState = config.selection === 'Myself' ? activePlayerState(state) : inactivePlayerState(state)
            const creatures = playerState.creatures
            const totalDamage = creatures.reduce((a, b) => a + b.tokens.damage, 0)
            creatures.forEach(x => x.tokens.damage = 0)
            for (let i = 0; i < totalDamage; i++) {
                (config.targets[i] as Creature).tokens.damage++
            }
        }
    }
}

cardScripts.scripts.set("entropic-manipulator", cardScript)