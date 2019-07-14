import { cardScripts } from "../../types/CardScripts"
import { CardScript } from "../../types/CardScript"
import { Creature } from "../../../shared/gamestate/Creature"
import { House } from "../../../shared/keyforge/house/House"
import { GameState } from "../../../shared/gamestate/GameState"
import { friendlyCreatures, dealDamage } from "../../types/ScriptUtils"

const cardScript: CardScript = {
	amber: () => 1,
	alpha: () => true,
    onPlay: {
        validTargets: (state) => {
            return friendlyCreatures(state)
            .filter(creature => creature.backingCard.house === House.Brobnar)
            .filter(creature => creature.ready)
        },
        choosenTargetsAreValid: (targets) => {
            //TODO yet another place where I need state for validation
            return targets.length === friendlyCreatures(state)
            .filter(creature => creature.backingCard.house === House.Brobnar)
            .filter(creature => creature.ready).length

        },
        perform: (state, config) => {
            config.targets.forEach(card => dealDamage(card as Creature, 2))
        }
    }
}

cardScripts.scripts.set("first-blood", cardScript)