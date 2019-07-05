export enum Event {
    PlayCreature = "PlayCreature",
    UseCreature = "UseCreature",
    DiscardCreature = "DiscardCreature",
    MoveCreatureToHand = "MoveCreatureToHand",
    AlterCreatureDamage = "AlterCreatureDamage",
    AlterCreaturePower = "AlterCreaturePower",
    CaptureAmber = "CaptureAmber",
    ToggleStun = "ToggleStun",

    PlayArtifact = "PlayArtifact",
    UseArtifact = "UseArtifact",
    DiscardArtifact = "DiscardArtifact",
    MoveArtifactToHand = "MoveArtifactToHand",

    PlayUpgrade = "PlayUpgrade",

    DrawCard = "DrawCard",
    DiscardCard = "DiscardCard",

    AlterPlayerAmber = "AlterPlayerAmber",
    EndTurn = "EndTurn",
}
