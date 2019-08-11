import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { destroyCard } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"

const cardScript: CardScript = {
    power: () => 2,
    elusive: () => true,
    onReap: {
        perform: async (state, config) => {
            const target = config.targets![0] as Creature
            await destroyCard(state, target)
        }
    }
}

cardScripts.scripts.set("bloodshard-imp", cardScript)
