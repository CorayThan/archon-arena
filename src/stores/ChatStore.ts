import { observable } from "mobx"

export class ChatStore {

    @observable
    chatWidth = 360

    @observable
    chatMessages: string[] = []
}

export const chatStore = new ChatStore()
