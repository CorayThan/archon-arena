import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { CardInGame } from "../../../shared/gamestate/CardInGame"
import { GameState, PlayerState } from "../../../shared/gamestate/GameState"
import { activePlayerState, inactivePlayerState, putInArchives, archiveTopCardOfDeck, onFlank, playTopCardOfDeck } from "../../ScriptUtils"
import { exec } from "../../../game/Actions/Actions"
import { removeCardFromHand } from "../../../game/StateUtils";

const cardScript: CardScript = {
  amber: () => 1,
  alpha: () => true,
  onPlay: {
    perform: (state, config) => {
      let player = activePlayerState(state) as PlayerState
      player.amber += 2

      for (let i = 0; i < 2; i++) {
        let randomIndex = Math.ceil(Math.random() * (player.hand.length - 1))
        putInArchives(state, player.hand[randomIndex], true)
        removeCardFromHand(player, player.hand[randomIndex].id)
      }
    }
  }
}

cardScripts.scripts.set("eureka", cardScript)
