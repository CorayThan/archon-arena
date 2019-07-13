import { CardScript, TargetArea, TargetType } from "../../types/CardScript"
import { cardScripts } from "../../types/CardScripts"
import { inactivePlayerState } from "../../types/ScriptUtils"

const cardScript: CardScript = {
    power: () => 6,
    elusive: () => true
}

cardScripts.scripts.set("culf-the-quiet", cardScript)