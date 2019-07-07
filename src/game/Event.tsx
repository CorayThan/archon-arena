export enum Event {
    PlayCreature = "PlayCreature",
    UseCreature = "UseCreature",
    DiscardCreature = "DiscardCreature",
    MoveCreatureToHand = "MoveCreatureToHand",
    AlterCreatureDamage = "AlterCreatureDamage",
    AlterCreaturePower = "AlterCreaturePower",
    CaptureAmber = "CaptureAmber",
    ToggleStun = "ToggleStun",
    ToggleTaunt = "ToggleTaunt",

    PlayArtifact = "PlayArtifact",
    UseArtifact = "UseArtifact",
    DiscardArtifact = "DiscardArtifact",
    MoveArtifactToHand = "MoveArtifactToHand",

    PlayUpgrade = "PlayUpgrade",

    DrawCard = "DrawCard",
    ArchiveCard = "ArchiveCard",
    DiscardCard = "DiscardCard",
    ShuffleDeck = "ShuffleDeck",
    AlterPlayerAmber = "AlterPlayerAmber",
    AlterPlayerChains = "AlterPlayerChains",
    ForgeKey = "ForgeKey",
    UnForgeKey = "UnForgeKey",
    EndTurn = "EndTurn",
}
