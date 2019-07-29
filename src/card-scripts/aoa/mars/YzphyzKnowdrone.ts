import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import {
    activePlayerState,
    allCreatures,
    inactivePlayerState,
    purgeCards,
    putInArchives,
    stunCreatures
} from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Play: Archive a card. You may purge an archived card to stun a creature.
    power: () => 3,
    armor: () => 1,
    onPlay: {
        validTargets: (state: GameState) => activePlayerState(state).hand,
        numberOfTargets: () => 1,
        perform: (state: GameState, config0: CardActionConfig) => {
            putInArchives(state, config0.targets, true)
            return {
                selectFromChoices: () => ["Purge From Opponent Archive", "Purge From My Archive"],
                perform: (state: GameState, config1: CardActionConfig) => {
                    //TODO hide opponents archive cards when choosing
                    const archive = config1.selection === "Purge From My Archive" ? activePlayerState(state).archives : inactivePlayerState(state).archives
                    return {
                        validTargets: () => archive,
                        numberOfTargets: () => 1,
                        perform: (state: GameState, config2: CardActionConfig) => {
                            if (config2.targets.length > 0) {
                                return {
                                    validTargets: allCreatures,
                                    numberOfTargets: () => 1,
                                    perform: (state: GameState, config3: CardActionConfig) => {
                                        purgeCards(state, config2.targets)
                                        stunCreatures(config3.targets as Creature[])
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

cardScripts.scripts.set("yzphyz-knowdrone", cardScript)