import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { CardInGame } from "../../../shared/gamestate/CardInGame"
import { GameState, PlayerState } from "../../../shared/gamestate/GameState"
import { activePlayerState, inactivePlayerState, putInArchives, archiveTopCardOfDeck } from "../../ScriptUtils"
import { exec } from "../../../game/Actions/Actions"

const cardScript: CardScript = {
  power: () => 2,
  onPlay: {
    perform: (state, config) => {
      putInArchives(state, config.thisCard as CardInGame, true)
      archiveTopCardOfDeck(state)
    }
  }
}

cardScripts.scripts.set("hexpion", cardScript)
