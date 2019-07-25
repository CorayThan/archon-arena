import { CardActionConfig, CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { GameState } from "../../../shared/gamestate/GameState"
import { allCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"
import { CardInGame } from "../../../shared/gamestate/CardInGame"
import { House } from "../../../shared/keyforge/house/House"

const cardScript: CardScript = {
    // Play: Choose a creature. Fully heal the chosen creature.
    // For the remainder of the turn, the chosen creature is considered to be in house Sanctum and cannot be dealt damage.
    onPlay: {
        validTargets: allCreatures,
        numberOfTargets: () => 1,
        perform: (state: GameState, config: CardActionConfig) => {
            (config.targets[0] as Creature).tokens.damage = 0;
            (config.targets[0] as CardInGame).house = House.Sanctum
            //TODO .canBEDealtDamage
            //(config.targets[0] as Creature).canBeDealtDamage = false
        }
    },
    atEndOfYourTurn: {
        perform: (state: GameState) => {
            const creatures = allCreatures(state).filter(x => (x as CardInGame).backingCard.house !== (x as CardInGame).house)
            creatures.forEach(x => {
                (x as CardInGame).house = (x as CardInGame).backingCard.house
                //(x as Creature).canBeDealtDamage = true

            })
        }
    }

}

cardScripts.scripts.set("golden-aura", cardScript)