import { CardScript } from "../../types/CardScript"
import { cardScripts } from "../../CardScripts"
import { activePlayerState, friendlyArtifacts, friendlyCreatures } from "../../ScriptUtils"
import { Creature } from "../../../shared/gamestate/Creature"
import { House } from "../../../shared/keyforge/house/House"
import { Artifact } from "../../../shared/gamestate/Artifact"
import { CardInGame } from "../../../shared/gamestate/CardInGame"

const cardScript: CardScript = {
    // Elusive. (The first time this creature is attacked each turn, no damage is dealt.) Fight/Reap: You may play or use an Untamed card this turn.
    power: () => 1,
    elusive: () => true,
    reap: {
        validTargets: (state) => {
            const creatures = friendlyCreatures(state).filter(x => (x as Creature).backingCard.house === House.Untamed)
            const artifacts = friendlyArtifacts(state).filter(x => (x as Artifact).backingCard.house === House.Untamed)
            const cards = activePlayerState(state).hand.filter(x => (x as CardInGame).backingCard.house === House.Untamed)
            return cards.concat(creatures).concat(artifacts)
        },
        numberOfTargets: () => 1,
        perform: (state, config) => {
            (config.targets[0] as CardInGame).house = House.Sanctum
        }
    },
    fight: {
        validTargets: (state) => {
            const creatures = friendlyCreatures(state).filter(x => (x as Creature).backingCard.house === House.Untamed)
            const artifacts = friendlyArtifacts(state).filter(x => (x as Artifact).backingCard.house === House.Untamed)
            const cards = activePlayerState(state).hand.filter(x => (x as CardInGame).backingCard.house === House.Untamed)
            return cards.concat(creatures).concat(artifacts)
        },
        numberOfTargets: () => 1,
        perform: (state, config) => {
            (config.targets[0] as CardInGame).house = House.Sanctum
        }
    },
    atEndOfYourTurn: {
        perform: (state) => {
            //TODO figure out how to save the card i switched otherwise i'll just rest all the cards
            const creatures = friendlyCreatures(state).filter(x => (x as Creature).backingCard.house === House.Untamed)
            const artifacts = friendlyArtifacts(state).filter(x => (x as Artifact).backingCard.house === House.Untamed)
            const cards = activePlayerState(state).hand.filter(x => (x as CardInGame).backingCard.house === House.Untamed)
            const allCards = cards.concat(creatures).concat(artifacts)
                .filter(x => (x as CardInGame).backingCard.house !== (x as CardInGame).house)
            allCards.forEach(x => (x as CardInGame).house = (x as CardInGame).backingCard.house)
        }
    }
}

cardScripts.scripts.set("untamed-ambassador", cardScript)