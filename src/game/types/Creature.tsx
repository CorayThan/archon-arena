export default interface Creature {
    name: string,
    id: string,
    ready: boolean,
    faceup: boolean,
    taunt: boolean,
    upgrades: object[],
    cardsUnderneath: object[],
    tokens: {
        [key: string]: number
    }
}
