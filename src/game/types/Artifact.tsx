export default interface Artifact {
    name: string,
    id: string,
    ready: boolean,
    faceup: boolean,
    cardsUnderneath: object[],
    tokens: {
        amber: number
    }
}
