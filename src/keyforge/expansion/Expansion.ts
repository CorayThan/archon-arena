export enum Expansion {
    COTA = "COTA",
    AOA = "AOA"
}

export const expansionFromNumber = (expansionNum: number) => {
    switch (expansionNum) {
        case 341:
            return Expansion.COTA
        case 435:
            return Expansion.AOA
        default:
            throw new Error("No expansion for number " + expansionNum)
    }
}
