import Upgrade from "./Upgrade"

export default interface Creature {
    name: string,
    id: string,
    ready: boolean,
    faceup: boolean,
    taunt: boolean,
    upgrades: Upgrade[],
    cardsUnderneath: { id: string, name: string }[],
    tokens: {
        [key: string]: number
    }
}
