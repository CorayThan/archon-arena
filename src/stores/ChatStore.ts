import { observable } from "mobx"

export class ChatStore {

    @observable
    chatWidth = 360
}

export const chatStore = new ChatStore()
