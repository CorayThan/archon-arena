import { observable } from "mobx"
import { Action } from "../game/ActionLogger"

export class ActionStore {

    @observable
    actionLog: Action[] = []

    addAction = (action: Action) => {
        this.actionLog.push(action)
    }
}

export const actionStore = new ActionStore()
