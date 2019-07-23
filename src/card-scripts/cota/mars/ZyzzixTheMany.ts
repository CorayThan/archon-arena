import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { activePlayerState, alterPower, putInArchives } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    // Fight/Reap: You may reveal a creature from your hand. If you do, archive it and Zyzzix the Many gets three +1 power counters.
    power: () => 3,
    reap: {
        validTargets: (state) => activePlayerState(state).hand.filter(x => x.backingCard.cardType === "Creature"),
        numberOfTargets: () => 1,
        upToTargets: () => true,
        perform: (state, config) => {
            if (0 >= config.targets.length) return
            putInArchives(state, config.targets, true)
            alterPower([config.thisCard] as Creature[], 3)
        }
    },
    fight: {
        validTargets: (state) => activePlayerState(state).hand.filter(x => x.backingCard.cardType === "Creature"),
        numberOfTargets: () => 1,
        upToTargets: () => true,
        perform: (state, config) => {
            if (0 >= config.targets.length) return
            putInArchives(state, config.targets, true)
            alterPower([config.thisCard] as Creature[], 3)
        }
    }
}

cardScripts.scripts.set("zyzzix-the-many", cardScript)