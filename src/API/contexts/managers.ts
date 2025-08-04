export type ActionHandler<T = any> = (data: T) => void;

export default class ActionManager {
    handlers: { [K in string]?: ActionHandler[] };

    constructor(){
        this.handlers = {}

    }
    execute = <T = any>(eventName: string, argument?: T) => {
        const handlers = this.handlers[eventName] || [];
        for(const handler of handlers){
            handler(argument);
        }
    }

    on = <T = any>(eventName: string, handler: ActionHandler<T>) => {
        if(!this.handlers[eventName]) this.handlers[eventName] = [];
        this.handlers[eventName]!.push(handler);
    }

    off = (eventName: string, handler: ActionHandler) => {
        if(!this.handlers[eventName]) this.handlers[eventName] = [];
        this.handlers[eventName] = this.handlers[eventName]!.filter(h => h !== handler);
    }
}
export class ConfigManager {
    listeners: ActionHandler[];
    data: { [K in string]?: any };

    constructor(){
        this.listeners = [];
        this.data = {};
    }
    save(data: { [K in string]?: any }){
        this.data = data;
        this.execute();


    }

    execute(){
        const listeners = this.listeners;
        if(!listeners || !listeners.length) return false;
        listeners.forEach(listener => {
            listener(this.data);
        });
        return true;
    }

    onChange = (listener: ActionHandler) => {
        const listOfListeners = this.listeners || [];
        listOfListeners.push(listener);
        this.listeners = listOfListeners;

        return true;
    }

    off = (listener: ActionHandler) => {
        this.listeners = this.listeners.filter(l => l !== listener);
    }

}