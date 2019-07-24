import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { CardInGame } from "../../../shared/gamestate/CardInGame"
import { GameState, PlayerState } from "../../../shared/gamestate/GameState"
import { activePlayerState, inactivePlayerState, putInArchives, archiveTopCardOfDeck, onFlank, enemyPlayerForCard, friendlyPlayerForCard } from "../../ScriptUtils"
import { exec } from "../../../game/Actions/Actions"

const cardScript: CardScript = {
  power: () => 6,
  staticEffect: (state, config) => {
    if (onFlank) {
      enemyPlayerForCard(state, config.thisCard).keyCost += 1
      friendlyPlayerForCard(state, config.thisCard).keyCost += 1
    }
  }
}

cardScripts.scripts.set("titan-mechanic", cardScript)
